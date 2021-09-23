import bcryptjs from 'bcryptjs';

import User,{validateUserParameters} from '../../models/user.js'

const signupUser=async (req,res)=>{
    

    try {
        
        const {name,email,password,confirm_password}=req.body;
        
        const error=await validateUserParameters({name,email,password,confirm_password});

        if(error) return res.status(400).json(error);
              
        const isUserExist=await User.findOne({email:email});
        
        if(!isUserExist){
            
            const hashPassword=await bcryptjs.hash(password,12);

            const user=new User({
                name,
                email,
                password:hashPassword
            });
            
            await user.save();

            return res.json({message:"successfully user is created"});
            
        } else{
            return res.json({message:"user is already existed."});
        }
    

    } catch (error) {
        return res.status(404).send(error);
    }
    
    
}



export {signupUser};