import express from "express";

import getAllPost from "../controllers/post/getPost.js";
import createPost from "../controllers/post/createPost.js";
import authorization from '../moddlewares/requireLogin.js';

const router=express.Router();

router.route('/get-allposts').get(authorization,getAllPost);
router.route("/create-post").post(authorization,createPost);

export default router;