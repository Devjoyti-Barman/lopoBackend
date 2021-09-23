import User from '../../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Joi from 'joi';
import bcrypt from 'bcryptjs';

dotenv.config();

const jwtPrivateKey=process.env.jwtPrivateKey;

const validateUser=async (user)=>{
     
    const schema= Joi.object({

        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),

        password: Joi.string()
            .min(5)
            .max(255)
            .required()  

    });
    try {
        await schema.validateAsync(user);
        return "";
        
    } catch (error) {
        return error.details[0].message;
    }
}

const signinUser=async (req,res)=>{
    
    try {

        const {email,password} =req.body;

        const error=await validateUser({email,password});

        if(error){
            return res.status(404).send(error);
        }

        const user=await User.findOne({email:email});

        if( !user ){
            return res.status(404).send('Invalid Email or Paassword');
        }else{
             
            const isMatch=await bcrypt.compare(password,user.password);

            if(isMatch){

                const jwtToken=jwt.sign({_id:user._id},jwtPrivateKey);
                return res.json({token:jwtToken});
                
            }else
                return res.status(401).send('Invalid Email or Password');
            

        }
        
    } catch (error) {

        return res.status(404).send(error);
    }
    
    

}

export {signinUser};