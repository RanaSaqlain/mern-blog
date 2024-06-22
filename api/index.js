import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; 

dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{console.log("Mongoose Connection Established")}).catch((err)=>{console.log(err)})
const app = express();

app.listen(3000, () => {
    console.log("Sever is at 3000..")
})