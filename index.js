import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cookieParser from "cookie-parser";

import { connectToDB } from "./config.js";
import { errorHandler } from "./src/middlewares/errorHandlerMiddleware.js";
import userRouter from "./src/features/users/userRoute.js";
import postRouter from "./src/features/posts/postRoute.js";
import commentRouter from "./src/features/comments/commentRoute.js";
import friendRouter from "./src/features/friends/friendRoute.js";
import likeRouter from "./src/features/likes/likeRoute.js";
import otpRouter from "./src/features/otps/otpRoute.js";
import { authMiddleware } from "./src/middlewares/authMiddleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);
app.use("/api/friends", friendRouter);
app.use("/api/otp", otpRouter);

// error handler middleware
app.use(errorHandler);

app.listen(3000, () => {
  console.log("server is listening at port 3000");
  connectToDB();
});
