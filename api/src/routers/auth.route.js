import { Router } from "express";
import { signIn, signup } from "../controllers/auth.controller.js";

const authRouter = Router();
UserRouter.route('/signup').post(signup)
UserRouter.route('/signin').post(signIn)
export default authRouter