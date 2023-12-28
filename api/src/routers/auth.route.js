import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";

const UserRouter = Router();
UserRouter.route('/api/signup').post(signup)
export default UserRouter