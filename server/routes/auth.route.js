import express from 'express';
import {isAuthenticated} from '../middleware/auth.middleware.js';
import { checkAuth, deleteUser, getProfile, login, logout, signup, updatePassword, updateProfile, updateProfilePic } from '../controllers/auth.controller.js';

const router = express.Router();

/* post */
router.post('/signup',signup);
router.post('/login',login);
router.post('/logout', isAuthenticated , logout);

/* get */
router.get('/check', isAuthenticated , checkAuth);
router.get('/profile/:id', isAuthenticated , getProfile);

/* put or update */
router.put('/update-password/:id', isAuthenticated , updatePassword);
router.put('/update-profile-pic/:id', isAuthenticated , updateProfilePic);
router.put('/update-profile/:id', isAuthenticated , updateProfile);

/* delete */
router.delete('/delete-user/:id' , isAuthenticated , deleteUser);

export default router;