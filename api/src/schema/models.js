import { model } from "mongoose";
import userSchema from "./user.model.js";
import listingSchema from "./listing.model.js";

export const User = model('User', userSchema);
export const Listing = model('Listing', listingSchema)