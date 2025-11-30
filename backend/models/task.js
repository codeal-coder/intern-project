import { Schema } from "mongoose";
import mongoose from "mongoose";

const taskSchema = new Schema({
  userId:{
     type: mongoose.Schema.Types.ObjectId,
      ref: "User" 
    },
  title:{
    type: String,
    required: true
    },
  description:{ 
    type: String 
    },
  Status:{
     type: String, enum: ["pending","completed"], 
     default: "pending" 
    },
  createdAt:{
     type: Date,
      default: Date.now 
    },
});
 const Task = mongoose.model("Task", taskSchema);

 export{Task};