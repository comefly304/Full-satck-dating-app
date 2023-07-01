import mongoose from "mongoose";
import colors from 'colors'

export const ConnectDb=()=>{
    try{
   mongoose.connect(process.env.MONGO_URL)
   console.log(`db connected`.bgGreen)
    }catch(err){
        console.log(`could not able to connect to mongodb`.bgRed)
    }
}

