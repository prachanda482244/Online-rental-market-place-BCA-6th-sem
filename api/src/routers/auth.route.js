import { Router } from "express";
import { googleSignIn, signIn, signOut, signup } from "../controllers/auth.controller.js";

const authRouter = Router();
authRouter.route('/signup').post(signup)
authRouter.route('/signin').post(signIn)
authRouter.route('/google').post(googleSignIn)
authRouter.route('/signout').get(signOut)

export default authRouter