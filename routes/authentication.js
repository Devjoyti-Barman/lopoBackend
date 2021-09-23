import express from "express";

import { signupUser } from "../controllers/authentication/signupUser.js";
import { signinUser } from "../controllers/authentication/signinUser.js";
const router=express.Router();

router.route("/signup").post(signupUser);
router.route("/signin").post(signinUser);

export default router;