import Blog from '../models/blog.model.js';
import cloudinary from '../config/cloudinary.js';

export const createBlog = async(req,res) => {
    try {
        
        const {title,category,description,content,tags,coverImage,authorId,authorName} = req.body;

        if(!title || !category || !description || !content || !tags || !coverImage || !authorId || !authorName)
            return res.status(400).json({success:false,message:'All Fields are required'});

        const uploadResponse = await cloudinary.uploader.upload(coverImage);
        const imageUrl = uploadResponse.secure_url ; 

        /* create new blog */
        const newBlog = await Blog.create({
            title, category, description, content, coverImage:imageUrl, tags, authorId, authorName
        });

        return res.status(201).json({success:true,message:'Blog created successfully',data:newBlog});

    } catch (error) {
        console.log('Error from create blog route' , error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};

export const getBlogs = async(req,res) => {
    try {
        const blogs = await Blog.find().sort({createdAt:-1});

        if(!blogs) return res.status(404).json({success:false,message:'No Blogs found'});

        return res.status(200).json({success:true,message:'Blogs fetched successfully !',data:blogs});

    } catch (error) {
        console.log('Error from get blog route' , error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};

export const getBlogById = async(req,res) => {
    try {
        const id = req.params.id;

        const blogs = await Blog.find({authorId:id}).sort({createdAt:-1});

        if(!blogs) return res.status(404).json({success:false,message:'No Blogs found'});

        return res.status(200).json({success:true,message:'Blog fetched successfully',data:blogs});

    } catch (error) {
        console.log('Error from get blog by id route' , error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};

export const viewBlog = async(req,res) => {
    try {
        const id = req.params.id;

        const blog = await Blog.findById(id);

        return res.status(200).json({success:true,message:`${id} blogs fetched successfully`,data:blog});
    } catch (error) {
        console.log('Error from view blog route' , error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};

export const updateBlog = async(req,res) => {
    try {
        const id = req.params.id ;
        const {title,category,description,content,tags,coverImage} = req.body;

        const uploadResponse = await cloudinary.uploader.upload(coverImage);
        const imageUrl = uploadResponse.secure_url;

        const updatedBlog = await Blog.findByIdAndUpdate(id , {
            title, category, description, content, tags , coverImage:imageUrl
        } , {new:true});

        if(!updatedBlog) return res.status(404).json({success:false,message:'No Blog Found'});

        return res.status(200).json({success:true,message:'Blog Updated successfully',data:updatedBlog});

    } catch (error) {
        console.log('Error from update blog route' , error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};

export const deleteBlog = async(req,res) => {
    try {
        const id = req.params.id;

        const deletedBlog = await Blog.findByIdAndDelete(id);

        if(!deletedBlog) return res.status(404).json({success:false,message:'Blog not found'});

        return res.status(200).json({success:true,message:`Blog ${id} deleted successfully`,data:deletedBlog});

    } catch (error) {
        console.log('Error from delete blog route' , error);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};