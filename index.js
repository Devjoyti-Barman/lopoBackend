import express from "express";
import dotenv from "dotenv";
import connectDB from "./connections/db.js";
import authenticationRouter from './routes/authentication.js'
import postRouter from './routes/post.js';


dotenv.config();


const app=express();

app.use(express.json());

app.use("/post",postRouter);
app.use('/user',authenticationRouter);

connectDB();

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is started at https://localhost:${PORT}`);
})



