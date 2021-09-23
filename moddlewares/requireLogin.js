import dotenv from 'dotenv';
import  Jwt  from "jsonwebtoken";
import User from "../models/user.js";
dotenv.config();

const jwtPrivateKey=process.env.jwtPrivateKey;



const authorization =async (req,res,next)=>{

    const {token}=req.headers;

    if(!token) return res.status(401).json({error:"you must be logged in"});
    
    Jwt.verify(token,jwtPrivateKey,(error,payload)=>{
        
        if(error) return res.status(401).json({error:"you must be logged in"});
        
        const {_id}=payload;
                    
        User.findById(_id)
            .then(user=>{

                if(!user) return res.status(401).json({error:"you must be logged in"});
            
                req.user =user;

                next();
            })
            
            .catch (error=>{
               return res.status(401).json({error:"Something went wrong please try again"});
            }) 

    })

 

}

export default authorization;