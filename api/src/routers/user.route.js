import { Router } from "express";
import { updateUser, users } from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/verifyUser.middleware.js";

const userRouter = Router();

userRouter.route('/test').get(users)
userRouter.route("/update/:id").post(verifyUser, updateUser).get(updateUser)
export default userRouter