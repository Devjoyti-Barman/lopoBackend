import Post from "../../models/post.js";


const getAllPost=async (req,res)=>{
     
    try {
        const allPosts=await Post.find({}).populate("postedBy","_id name");
        return res.send(allPosts);
    } catch (error) {
        return res.status(401).json({error:error});
    }
}


export default getAllPost;