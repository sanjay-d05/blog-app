import Comment from '../models/comment.model.js';

export const createComment = async(req,res) => {
    try {
        const {blogId,commenterName,commentText} = req.body;

        if(!commentText) return res.status(400).json({success:false,message:'Type a comment'});

        /* create a new comment */
        const newComment = await Comment.create({
            blogId,commenterName,commentText
        });

        return res.status(201).json({success:true,message:'Comment posted successfully',data:newComment});

    } catch (error) {
        console.log('Error from create comment route',error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};

export const getComments = async(req,res) => {
    try {

        const id = req.params.id;

        const comment = await Comment.find({blogId:id}).sort({createdAt:-1});

        if(!comment) return res.status(404).json({success:false,message:'No comment posted yet'});

        return res.status(200).json({success:true,message:'Comment fetched successful',data:comment});

    } catch (error) {
        console.log('Error from get comment route',error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};

export const updateComment = async(req,res) => {
    try {

        const id = req.params.id;
        const {commentText} = req.body;

        const updatedComment = await Comment.findByIdAndUpdate(id , {commentText} , {new:true});

        if(!updatedComment) return res.status(404).json({success:false,message:'No Comment found'});

        return res.status(200).json({success:true,message:'Comment Updated Successfully',data:updatedComment});
        
    } catch (error) {
        console.log('Error from update comment route',error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};

export const deleteComment = async(req,res) => {
    try {
        const id = req.params.id;

        const deletedComment = await Comment.findByIdAndDelete(id);

        return res.status(200).json({success:true,message:'Comment deleted successfully',data:deletedComment});
    } catch (error) {
        console.log('Error from delete comment route',error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};