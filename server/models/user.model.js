import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        default:''
    },
    profilePic:{
        type:String,
        default:''
    },
    instagramUrl:{
        type:String,
        default:''
    },
    linkedinUrl:{
        type:String,
        default:''
    },
    githubUrl:{
        type:String,
        default:''
    },
    facebookUrl:{
        type:String,
        default:''
    },

},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;