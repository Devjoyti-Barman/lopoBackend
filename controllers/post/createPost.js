
import Post from '../../models/post.js'


const createPost=async (req,res)=>{
    
    try {
        const {title,body} =req.body;

        if(!title || !body ){
              return res.status(422).json({error:"Please add the all fields"});
        }
        
        req.user.password=undefined;

        const post=new Post({
            title,
            body,
            postedBy:req.user
        });
        
        const savedPost=await post.save();

        return res.json({post:savedPost});

    } catch (error) {
        return res.status(400).json({error:error});
    }

}


export default createPost;