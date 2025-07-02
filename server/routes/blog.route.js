import express from 'express';
import {isAuthenticated} from '../middleware/auth.middleware.js';
import { createBlog, deleteBlog, getBlogById, getBlogs, updateBlog, viewBlog } from '../controllers/blog.controller.js';

const router = express.Router();

/* post */
router.post('/create' , isAuthenticated , createBlog);

/* get */
router.get('/' , isAuthenticated , getBlogs);
router.get('/:id' , isAuthenticated , getBlogById);
router.get('/view-blog/:id' , isAuthenticated , viewBlog);

/* put */
router.put('/update-blog/:id' , isAuthenticated , updateBlog);

/* delete */
router.delete('/delete/:id' , isAuthenticated , deleteBlog);

export default router;