import { Schema } from "mongoose";
const userSchema  = Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
},
{
    timestamps:true
}
)

export default userSchema;
