import express from "express"
import mongoose from "mongoose" 
import dotenv from "dotenv"
import cors from "cors"
import { dbconnect } from "./config/dbconnect.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js"

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;


app.use(express.json({limit:"100kb"}))
app.use(express.urlencoded({limit:"100kb", extended:true}));
app.use(cors())
 


app.use("/api/v1/user",userRoutes);
app.use("/api/v1/task",taskRoutes);

app.get("/",(req,res)=>{
    res.send("default page")
})


dbconnect();
app.listen(port,()=>{
    console.log(`app ia listing om ${port}`);
    
})
