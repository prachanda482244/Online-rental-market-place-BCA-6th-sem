import { model } from "mongoose";
import userSchema from "./user.model.js";
export const User = model('User', userSchema);