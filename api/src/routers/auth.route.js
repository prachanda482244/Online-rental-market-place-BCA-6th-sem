import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";

const UserRouter = Router();
UserRouter.route('/signup').post(signup)
export default UserRouter