import express from "express";

import createPost from "../controllers/post/createPost.js";
import authorization from '../moddlewares/requireLogin.js';

const router=express.Router();

router.route("/").post(authorization,createPost);

export default router;