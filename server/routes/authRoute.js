import express from 'express';
import { checkAuth, editBio, editProfilePic, login, logout, signup, updatePassword } from '../controllers/authController.js';
import { protectRoute } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);
router.post('/update-password',updatePassword);

router.get('/check', protectRoute , checkAuth);

router.put('/update-profilePic/:id',editProfilePic);
router.put('/update-bio/:id', protectRoute,editBio);

export default router;