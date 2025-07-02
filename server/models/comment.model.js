import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        blogId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Blog'
        } ,
        commenterName:{
            type:String,
            required:true
        } ,
        commentText:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
);

const Comment = mongoose.model('Comment',commentSchema);

export default Comment;