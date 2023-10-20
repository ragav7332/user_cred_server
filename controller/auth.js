import  jwt  from "jsonwebtoken";
import { User } from "../module/user.js";
import { getUserById } from "./user.js";

//custom middleware
const isAuthenticated = async(req,res,next)=>{
    let token;
    if(req.headers){
        try{
            token = await req.headers["x-auth-token"]
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            req.user = await getUserById(decode.id);
            next();
        }catch(error){
            console.log(error);
        res.status(500).json({ error: "Internal server error" });
        }
    }
    if(!token){
        return res.status(400).json({ error:"Invalid creditionals" });
    }
}
export { isAuthenticated };