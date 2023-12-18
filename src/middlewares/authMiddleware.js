import jwt from "jsonwebtoken";
import { userModel } from "../features/users/userSchema.js";
import customError from "./errorHandlerMiddleware.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    throw new customError("token not found", 404);
  }
  try {
    const validToken = await jwt.verify(token, process.env.TOKEN_SECRET);
    if (validToken) {
      const userDetails = await userModel.findById(validToken.userId);
      if (userDetails) {
        if (userDetails.activeSessions.includes(token)) {
          req.userId = userDetails._id;
          next();
        } else {
          throw new customError("Token not found in active sessions", 404);
        }
      } else {
        throw new customError("user not found", 404);
      }
    }
  } catch (err) {
    next(err);
  }
};
