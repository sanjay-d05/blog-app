import express from 'express';
import {isAuthenticated} from '../middleware/auth.middleware.js';
import { createComment, deleteComment, getComments, updateComment } from '../controllers/comment.controller.js';

const router = express.Router();

/* post */
router.post('/create-comment' , isAuthenticated , createComment);

/* get */
router.get('/:id' , isAuthenticated , getComments);

/* put or update */
router.put('/update-comment/:id' , isAuthenticated , updateComment);

/* delete */
router.delete('/delete-comment/:id' , isAuthenticated , deleteComment);

export default router;