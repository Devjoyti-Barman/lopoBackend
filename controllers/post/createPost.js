
import Post from '../../models/post.js'


const createPost=async (req,res)=>{
    
    try {
        const {title,body,photo} =req.body;

        if(!title || !body || !photo){
              return res.status(422).json({error:"Please add the all fields"});
        }
        
        req.user.password=undefined;

        const post=new Post({
            title,
            body,
            photo,
            postedBy:req.user
        });
        
        const savedPost=await post.save();

        return res.json({post:savedPost});

    } catch (error) {
        return res.status(400).json({error:error});
    }

}


export default createPost;