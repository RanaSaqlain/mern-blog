import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from "./routes/user.route.js"
import authRoutes from  "./routes/auth.route.js"

dotenv.config();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Mongoose Connection Established")
}).catch((err)=>{
    console.log(err)
})

const app = express();

// Middleware
app.use(express.json());

// File upload middleware
app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    abortOnLimit: true,
    responseOnLimit: "File size limit exceeded (5MB max)",
}));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000..")
})