import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    } ,
    category:{
        type:String,
        required:true
    } ,
    description:{
        type:String,
        required:true
    } ,
    content:{
        type:String,
        required:true
    } ,
    coverImage:{
        type:String,
        required:true
    } ,
    tags:{
        type:[String],
        required:true
    } ,
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    } ,
    authorName:{
        type:String,
        required:true
    }

},
{
    timestamps:true
});

const Blog = mongoose.model('Blog' , blogSchema);

export default Blog;