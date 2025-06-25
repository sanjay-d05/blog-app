import express from 'express';
import { createComments, getComments } from '../controllers/commentController.js';
import {protectRoute} from '../middleware/auth.js'

const router = express.Router();

router.post('/',protectRoute,createComments);
router.get('/:id',protectRoute,getComments);

export default router;