import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cookieParser from "cookie-parser";

import { connectToDB } from "./config.js";
import { errorHandler } from "./src/middlewares/errorHandlerMiddleware.js";
import userRouter from "./src/features/users/userRoute.js";
import { authMiddleware } from "./src/middlewares/authMiddleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// user route
app.get("/", authMiddleware, (req, res) => {
  res.json({ msg: "authenticated" });
});
app.use("/api/users", userRouter);

// error handler middleware
app.use(errorHandler);

app.listen(3000, () => {
  console.log("server is listening at port 3000");
  connectToDB();
});
