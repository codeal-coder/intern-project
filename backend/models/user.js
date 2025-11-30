import mongoose from "mongoose";
import  { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        
    },
    role:{
        type:String,
        enum:["Admin","User"],
        required:true,
    },
    task:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Task",
        }
    ],
    token:{
        type:String,
    },
    created:{
        type:Date,
        default:Date.now,
    }

});

const User = mongoose.model("User",userSchema);

export {User}