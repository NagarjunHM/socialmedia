import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/SocialMedia");
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.log(err);
  }
};
