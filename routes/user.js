import  express  from "express";
import { User, generateToken } from "../module/user.js";
import { getUserByEmail } from "../controller/user.js";
import bcrypt from 'bcrypt';

const router = express.Router();
//Login routes
router.get('/test', (req,res) => res.json({ message: "Users works" }));

router.post("/login",async(req,res)=>{
     try{
      //user exist or not
       const user = await getUserByEmail(req);
       if(!user){
        return res.status(404).json({ error:"Invalid Creditionals" });
     }
     //validate password
     const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
     );
     if(!validatePassword){
        return res.status(400).json({ error:"Invalid creditional" });
     }
     const token = generateToken(user._id);
     res.status(200).json({ message:"Login successfully", token });

     }catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
     }
});

//Signup routes
router.post("/signup", async(req,res)=>{
    try{
        //check user already Exist
     let user = await getUserByEmail(req);
     if(user){
        return res.status(401).json({ error:"user Already Exist" });
     }
     //Generate hash password by using salt
     const salt = await bcrypt.genSalt(10);
     const hashPassword = await bcrypt.hash(req.body.password, salt);

     user = await new User({
        username: req.body.username,
        email: req.body.email,
        password:hashPassword,
    }).save();

    const token = generateToken(user._id);
    res.status(201).json({ message: "Successfully Created", token });
    }catch (error){
     console.log(error);
     res.status(500).json({ error: "Internal server error" });
    }
});

export const userRouter = router;