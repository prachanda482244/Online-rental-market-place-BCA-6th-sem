import { Router } from "express";
import { deleteUser, updateUser, users } from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/verifyUser.middleware.js";

const userRouter = Router();

userRouter.route('/test').get(users)
userRouter.route("/update/:id").post(verifyUser, updateUser)
userRouter.route("/delete/:id").delete(verifyUser, deleteUser)
export default userRouter