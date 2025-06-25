import { generateToken } from "../config/utils.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import cloudinary from '../config/cloudinary.js';

export const signup = async(req,res) => {
    try {
        const {name,email,password}=req.body;

        if(!name || !email || !password) return res.status(400).json({success:false,message:'All Fields are Required'});

        if(password.length < 8) return res.status(400).json({success:false,message:'Password must be 8 characters long'});

        const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailregex.test(email)) return res.status(400).json({success:false,message:'Inavalid email'});

        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(400).json({success:false,message:'User already exists'});

        /* hash password */
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        /* create user in db */
        const newUser = await User.create({
            name,
            email,
            password : hashedPassword
        });

        return res.status(201).json({success:true,message:'Account Creation Successful',data:newUser});

    } catch (error) {
        console.log('Error from Signup route',error);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const login = async(req,res) => {
    try {
        const {email,password}=req.body;

        if(!email || !password) return res.status(400).json({success:false,message:'All Feilds are Required'});

        const user = await User.findOne({email});

        if(!user) return res.status(400).json({success:false,message:'Invalid Credentials'});

        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch) return res.status(400).json({success:false,message:'Invalid Credentials'});

        generateToken(user._id,res);

        return res.status(200).json({sucess:true,message:'Logged in Successfully',data:{
            id:user._id,
            name:user.name,
            email:user.email
        }});

    } catch (error) {
        console.log('Error from Login route',error);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const logout = async(req,res) => {
    try {
        res.cookie("accessToken","",{maxAge:0});
        return res.status(200).json({success:true,message:'Logged Out Successfully'});

    } catch (error) {
        console.log('Error from Logout route',error);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const checkAuth = async(req,res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log('Error in check auth route',error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};

export const editProfilePic = async(req,res) => {
    try {
        const {profilePic} = req.body;
        const {id} = req.params ;

        if(!profilePic) return res.status(400).json({success:false,message:'Select an profile Pic'});

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(id , {profilePic:uploadResponse.secure_url},{new:true});

        return res.status(200).json({success:true,message:'Profile Pic Updated Successfully',data:updatedUser});

    } catch (error) {
        console.log('Error in edit profile pic route');
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const editBio = async(req,res) => {
    try {
        const {bio} = req.body;
        const id = req.params.id;

        if(!bio) return res.status(400).json({success:false,message:'Enter ur bio or update ur existing one'});

        const updatedUser = await User.findByIdAndUpdate(id,{bio},{new:true});

        return res.status(200).json({success:true,message:'Bio updated successfully',data:updatedUser});

    } catch (error) {
        console.log('Error in edit Bio route');
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const updatePassword = async(req,res) => {
    try {
        const {email , currentPassword ,newPassword , conformNewPassword} = req.body ;

        if(!currentPassword || !newPassword || !conformNewPassword) return res.status(400).json({success:false,message:'All Fields are required'});
        
        const user = await User.findOne({email});

        const isPasswordCorrect = await bcrypt.compare(currentPassword , user.password);

        if(!isPasswordCorrect) return res.status(400).json({success:false,message:'Incorrect Current Password'})

        if(newPassword.length < 8) return res.status(400).json({success:false,message:'New Password must be 8 characters long'});

        if(newPassword !== conformNewPassword) return res.status(400).json({success:false,message:'The conform password does not match with the new Password'});

        const isSamePassword = await bcrypt.compare(newPassword,user.password);

        if(isSamePassword) return res.status(400).json({success:false,message:'New Password is same as the previous one select a different one'});

        const salt = await bcrypt.genSalt(5);
        const hashedNewPassword = await bcrypt.hash(newPassword,salt);

        user.password = hashedNewPassword;

        await user.save();

        return res.status(200).json({success:true,message:'Password updated successfully !'});

    } catch (error) {
        console.log('Error from update password route' , error);
        return res.status(500).json({success:false,message:'Internal Server Error'});        
    }
};