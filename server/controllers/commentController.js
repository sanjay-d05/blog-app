import Comment from "../models/Comment.js";

export const createComments = async(req,res) => {
    try {
        const {blogId,commenterName,commentText} = req.body;

        if(!commentText) return res.status(400).json({success:false,message:'Type a comment to post',});

        const newComment = await Comment.create({
            blogId,commenterName,commentText
        });

        return res.status(201).json({success:true,message:'Comment posted successfully',data:newComment});

    } catch (error) {
        console.log('Error from create comments route',error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};

export const getComments = async(req,res) => {
    try {
        const {id} = req.params ;
        const comments = await Comment.find({ blogId: id }).sort({ createdAt: -1 });
        return res.status(200).json({success:true,message:'Fetched Blogs Successfully',data:comments});
    } catch (error) {
        console.log('Error from get comments comments route',error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};