import Blog from "../models/Blog.js";
import cloudinary from '../config/cloudinary.js';

export const createBlog = async(req,res) => {
    try {
        const {title,description,category,content,author,coverImage,tags ,authorName}=req.body;

       if (
        !title ||
        !description ||
        !category ||
        !content ||
        !coverImage ||
        !Array.isArray(tags) || tags.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message: 'All Fields are required (including at least one tag)'
        });
      }


        const uploadResponse = await cloudinary.uploader.upload(coverImage);
        const imageUrl = uploadResponse.secure_url;

        /* create a new blog */
        const newBlog = await Blog.create({
            title,description,category,content,author,coverImage:imageUrl,tags,authorName
        });

        return res.status(200).json({success:true,message:'Blog created Successfully',data:newBlog});

    } catch (error) {
        console.log('Error from create blog route',error);
        return res.status(500).json({success:false,message:'Internal server errer'});
    }
};

export const getBlogs = async(req,res) => {
    try {
        const blogs = await Blog.find().sort({createdAt:-1});
        return res.status(200).json({success:true,message:'Fetched Blogs Successfully',data:blogs})
    } catch (error) {
        console.log('Error from Get blog route',error);
        return res.status(500).json({success:false,message:'Internal server errer'});
    }
};

export const getBlogById = async (req, res) => {
  try {
    const id = req.params.id;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: `No Blog Found with the id ${id}` });
    }

    return res.status(200).json({ success: true, message: `Blog ${id} fetched successfully`, data: blog });
  } catch (error) {
    console.log('Error from Get blog by Id route', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const updateBlog = async(req,res) => {
    try {
        const {title,description,category,content,tags,coverImage}=req.body;
        const id = req.params.id;

        const checkId = await Blog.findById(id);

        if(!checkId) return res.status(404).json({success:false,message:`No Blog with id ${id}`});

        
        const uploadResponse = await cloudinary.uploader.upload(coverImage);
        const imageUrl = uploadResponse.secure_url ;

        const updatedBlog = await Blog.findByIdAndUpdate(id,{title,description,category,content,coverImage:imageUrl,tags},{new:true});

        return res.status(200).json({success:true,message:`Blog ${id} Updated Successfully`,data:updatedBlog});

    } catch (error) {
        console.log('Error from update blog route',error);
        return res.status(500).json({success:false,message:'Internal server errer'});
    }
};

export const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;


    const deletedBlog = await Blog.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: `Blog "${deletedBlog.title}" deleted successfully`
    });

  } catch (error) {
    console.log('Error from delete blog route', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
