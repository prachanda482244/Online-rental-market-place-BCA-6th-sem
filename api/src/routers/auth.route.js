import { Router } from "express";
import { signIn, signup } from "../controllers/auth.controller.js";

const UserRouter = Router();
UserRouter.route('/api/signup').post(signup)
UserRouter.route('/api/signin').post(signIn)
export default UserRouter