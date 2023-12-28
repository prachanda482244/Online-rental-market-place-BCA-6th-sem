import { Router } from "express";
import { users } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route('/test').get(users)

export default userRouter