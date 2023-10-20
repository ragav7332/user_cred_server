import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dataBaseConnection } from "./db.js";
import { userRouter } from "./routes/user.js";
import { notesRouter } from "./routes/notes.js";
import { isAuthenticated } from "./controller/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

//connecting database
dataBaseConnection();

app.use("/api/user", userRouter );
app.use("/api/notes",isAuthenticated, notesRouter);
// app.get("/",(req,res)=>{
//     res.send("Home page");
// })

//server connection
app.listen(PORT,()=>{console.log("server is connected in http://localhost:8070")})