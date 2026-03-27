import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import authRouter from './routes/auth.routes.js'



const app = express();

// env file import
dotenv.config()

// middleware 
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// routes
app.use("/api/auth", authRouter);



const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server running on PORT ${PORT}`);
})