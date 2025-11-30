import {User} from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import httpStatus from "http-status"





const signUp =async(req,res)=>{
    try {
        console.log("signup");
        
        const{name,email,password,role} = req.body;

        if(!name || !email || !password  || !role){
            return res.status(httpStatus.NOT_FOUND).json({message:"missing field"})
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(httpStatus.ALREADY_REPORTED).json({message:"user already exist"});

        }

        const hashPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            name:name,
            email:email,
            password:hashPassword,
            role:role,
            
        })
         await newUser.save();

        return  res.status(httpStatus.CREATED).json({message:"signup successfully",newUser})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"something went wrong"});
        
    }

}

const login = async(req,res)=>{
    try {

        const {email,password} = req.body;
        
        if (!email || !password) {
            res.status(httpStatus.NOT_FOUND).json({message:"details not found"});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message:"email not found"})
        }

        if(bcrypt.compare(password,user.password)){
            
            const payload = {
                email:user.email,
                id:user._id,
                role:user.role
            }
            const token = jwt.sign(payload,process.env.JWT_SECERET,{
                expiresIn:"24h"
            })

            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({message:"login successfully",token:token});

        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"somwthing went wrong"})
        
    }
}

export {login,signUp}