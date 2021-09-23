import express from "express";

import { signupUser } from "../controllers/authentication/signupUser.js";

const router=express.Router();

router.route("/signup").post(signupUser);

export default router;