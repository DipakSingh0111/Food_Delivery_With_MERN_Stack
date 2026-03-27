import express from 'express';
import dotenv from 'dotenv';


const app = express();

// env file import
dotenv.config()

app.get("/", (req, res)=>{
    res.send("Getting Data")
})









const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`);
})