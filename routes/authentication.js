import express from "express";

import { signupUser } from "../controllers/authentication/signupUser.js";
import { signinUser } from "../controllers/authentication/signinUser.js";
import authorization from "../moddlewares/requireLogin.js";

const router=express.Router();

router.route("/product").get(authorization,(req,res)=>{
    res.send("hello it is protected");
})
router.route("/signup").post(signupUser);
router.route("/signin").post(signinUser);

export default router;