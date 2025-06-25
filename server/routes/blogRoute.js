import express from "express";
import { createBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from "../controllers/blogController.js";
import {protectRoute} from '../middleware/auth.js';

const router = express.Router();

router.post('/create',protectRoute, createBlog);

router.get('/',protectRoute, getBlogs);
router.get('/:id',protectRoute, getBlogById);

router.put('/:id',protectRoute, updateBlog);

router.delete('/:id' ,protectRoute, deleteBlog);

export default router;