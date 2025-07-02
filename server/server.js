import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.route.js';
import blogRoutes from './routes/blog.route.js';
import commentRoutes from './routes/comment.route.js';

const app = express();

const PORT = process.env.PORT;
const CLIENT_URI = process.env.CLIENT_URI;
// List of allowed origins (one from env, others hardcoded)
const allowedOrigins = [
  CLIENT_URI,
  "http://localhost:3000",
  "https://blog-app-client-z7qz.onrender.com"
];


/* middleware */
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.get('/', async(req,res) => {
    res.json('Test is working');
});

app.use('/api/auth' , authRoutes);
app.use('/api/blogs' , blogRoutes);
app.use('/api/comments' , commentRoutes);


connectDB().then(() => {
    app.listen(PORT , () => {
        console.log(`Server is running on Port ${PORT}`);
    })
}).catch((err) => {
    console.log('Server connection failed' , err);
})
