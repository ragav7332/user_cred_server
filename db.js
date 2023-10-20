import mongoose from "mongoose";
import  dotenv  from "dotenv";
export function dataBaseConnection(){
    const params = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
      mongoose.connect(process.env.MONGO_URL, params);
      console.log("Mongodb is connected");
    } catch (error) {
      console.log("Mongodb connection Error");
    }
};