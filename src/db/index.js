import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connecttionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB Conneted !! DB Host : ${connecttionInstance.connection.host} \n`
    );
  } catch (error) {
    console.log("mongoDB connection failed", error);
    process.exit(1);
  }
};
export default connectDB;
