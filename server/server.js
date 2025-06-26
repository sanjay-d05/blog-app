import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoute.js';
import blogRoutes from './routes/blogRoute.js';
import commentRoutes from './routes/commentRoute.js';
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
  origin: [
    process.env.CLIENT_URI,
    'https://blog-app-client-4j23.onrender.com'
  ] , 
  credentials:true
}));

app.use('/api/auth',authRoutes);
app.use('/api/blogs',blogRoutes);
app.use('/api/comments',commentRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
    connectDB();
})
