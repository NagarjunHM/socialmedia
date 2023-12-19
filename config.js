import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/SocialMedia", {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      retryWrites: true, // Include this option for transactions
    });
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.log(err);
  }
};
