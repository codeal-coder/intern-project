import mongoose from "mongoose";

export const dbconnect = async()=>{
    try {
         await mongoose.connect(process.env.MANGODB_URL);
        console.log("db connect successfully");
        
        
    } catch (error) {
        console.log(error);
        console.log("DB connection Failed");
        process.exit(1);
        
        
        
    }
}