import mongoose from 'mongoose';
import Joi from 'joi';

const userSchema=new mongoose.Schema({
     
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:5,
        maxlength:1000
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    
}, {timestamps:true}
);

const User=mongoose.model('User',userSchema);


const validateUserParameters= async (user)=>{
    
    const schema= Joi.object({

        name:  Joi.string()
           .min(3)
           .max(255)
           .required(),
        password: Joi.string()
            .min(5)
            .max(255)
            .required(),
        confirm_password: Joi.ref('password'),
        
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })

    });

    try {
        await schema.validateAsync(user);
        return undefined;
        
    } catch (error) {
        return error.details[0].message;
    }

}




export default User;
export {validateUserParameters};