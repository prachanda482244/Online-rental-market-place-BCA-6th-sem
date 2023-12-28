import { model } from "mongoose";
import userSchema from "./user.model";
export const User = model('User',userSchema);