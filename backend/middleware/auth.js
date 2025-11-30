
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();


const auth = async(req,res,next)=>{
    
    try {
        
        //console.log("token");
        //console.log(req.header("Authorization").replace("Bearer ", ""));
        
        
        const token = req.header("Authorization").replace("Bearer ", "");  
        //console.log(token);
              
        
        if (!token) {
            res.status(401).json({message:"token missing"})
        }

        try {
            const decode = await jwt.verify(token,process.env.JWT_SECERET);
            
            
            req.user = decode;
            
        } catch (error) {
            console.log(error);
            
            return res.status(500).json({message:"errro in token or token is invalid"
            })
            
        }
        
        
        next();
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message:"auth:something went wrong"
            });
        
    }
}


const isUser = async(req,res,next) =>{
    try {
        if (req.user.role !== "User") {
            return res.status(401).json({
                message:"this is protected route for user  only "
            })
        } 
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user rol caanot be verified  "
        });
    }
}



const isAdmin = async(req,res,next) =>{
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                message:"this is protected route for Admin  only "
            })
        }
        next();


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Admin rol can not be verified  "
        });
    }
}

export {auth,isAdmin,isUser};