
import Post from "../../models/post.js";

const getMyPost=async (req,res)=>{

    try {
        
        const myPosts=await Post.find({postedBy:req.user._id})
                        .populate("postedBy","_id name");
        return res.send(myPosts);
    } catch (error) {
        return res.status(401).json({error:error});

    }
}

export default getMyPost;