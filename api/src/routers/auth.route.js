import { Router } from "express";
import { signIn, signup } from "../controllers/auth.controller.js";

const authRouter = Router();
authRouter.route('/signup').post(signup)
authRouter.route('/signin').post(signIn)
export default authRouter