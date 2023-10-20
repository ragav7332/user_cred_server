import { model,Schema } from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
         {
            username :{
                type: String,
                required:true,
                maxlength: 32,
                trim : true
            },
            password :{
                type: String,
                required:true,
                unique:true,
                trim : true
            },
            email:{
                type: String,
                required:true,
                trim : true
            }
         },
         { timestamps: true}
);
const User = model("user",userSchema);
const generateToken = (id)=>{
   return jwt.sign({id},process.env.SECRET_KEY)
}
export { User, generateToken };