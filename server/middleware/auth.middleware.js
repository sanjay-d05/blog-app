import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const isAuthenticated = async(req,res,next) => {
    try {
        const token = req.cookies.blogAccessToken ;

        if(!token) return res.status(401).json({success:false,message:'Unauthorized No Token Provided'});

        if(token){

            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            if(!decoded) return res.status(401).json({success:false,message:'Unauthorized Invalid Token'});

            const user = await User.findById(decoded.userId).select("-password");

            if(!user) return res.status(404).json({success:false,message:'No User found'});

            req.user = user ;

            next();

        }

    } catch (error) {
        console.log('Error from middleware' , error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};