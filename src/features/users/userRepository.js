import { userModel } from "./userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import customError from "../../middlewares/errorHandlerMiddleware.js";

// user signup
export const userSignUp = async (userDetails, filename) => {
  try {
    if (userDetails.password || userDetails.password.trim() !== "") {
      const password = await bcrypt.hash(userDetails.password, 10);
      const newUser = new userModel({
        ...userDetails,
        password: password,
        profilePicture: filename,
      });
      await newUser.save();
      return { statusCode: 201, msg: "user created successfully" };
    } else {
      throw new customError("password cannot be empty", 400);
    }
  } catch (err) {
    if (err.code == 11000) {
      throw new customError(
        "Account already exists with this email address. Try with other email ",
        400
      );
    } else {
      throw err;
    }
  }
};

// user signin
export const userSignIn = async (userDetails) => {
  try {
    const { email, password } = userDetails;
    const validUser = await userModel.findOne({ email: email });

    if (validUser !== null) {
      const passwordMatch = await bcrypt.compare(password, validUser.password);
      if (passwordMatch) {
        // generating jwt token
        const token = jwt.sign(
          { userId: validUser._id, email: validUser.email },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );

        validUser.activeSessions.push(token);
        await validUser.save();

        return {
          statusCode: 200,
          msg: { msg: "login successful", token: token },
        };
      } else {
        throw new customError("invalid password", 400);
      }
    } else {
      throw new customError("User does not exist", 404);
    }
  } catch (err) {
    throw err;
  }
};

// user logout
export const userLogOut = async (token) => {
  try {
    if (token) {
      // removing the token from activeSession
      const decodedToken = jwt.decode(token);
      const userDetails = await userModel.findById(decodedToken.userId);

      const tokenIndex = userDetails.activeSessions.indexOf(token);

      if (tokenIndex !== -1) {
        userDetails.activeSessions.splice(tokenIndex, 1);
        await userDetails.save();
      } else {
        throw new customError("Token not found in active sessions", 401);
      }

      return { msg: "logout successfull", statusCode: 200 };
    } else {
      throw new customError("token not found", 401);
    }
  } catch (err) {
    throw err;
  }
};

// user log out from all devices
export const userLogOutAllDevices = async (token) => {
  try {
    if (token) {
      // remove all the activeSessions saved in the array
      const decodedToken = jwt.decode(token);
      const userDetails = await userModel.findById(decodedToken.userId);

      const tokenIndex = userDetails.activeSessions.indexOf(token);

      if (tokenIndex !== -1) {
        userDetails.activeSessions = [];
        await userDetails.save();
      } else {
        throw new customError("Token not found in active sessions", 401);
      }

      return { msg: "successfull logout from all devices", statusCode: 200 };
    } else {
      throw new customError("token not found", 401);
    }
  } catch (err) {
    throw err;
  }
};

// get all users detail
export const getAllUsersDetails = async () => {
  try {
    const allUserDetails = await userModel
      .find()
      .select("-activeSessions -password");

    if (allUserDetails) {
      return {
        statusCode: 200,
        msg: { msg: "retrieve successfull", users: allUserDetails },
      };
    } else {
      return { statusCode: 200, msg: "there is no users" };
    }
  } catch (err) {
    throw err;
  }
};

// get details of specific user by userId
export const getDetails = async (userId) => {
  try {
    const userDetail = await userModel
      .findById(userId)
      .select("-password -activeSessions");
    if (userDetail) {
      return {
        statusCode: 200,
        msg: { msg: "retrieve successfull", user: userDetail },
      };
    } else {
      return {
        statusCode: 404,
        msg: { msg: "user not found" },
      };
    }
  } catch (err) {
    throw err;
  }
};

// update user details
export const updateUserDetails = async (userId, userDetails) => {
  try {
    if (userId) {
      const user = await userModel
        .findById(userId)
        .select("-password -activeSessions");

      if (user) {
        if (userDetails.name) {
          user.name = userDetails.name;
        }

        if (userDetails.email) {
          user.email = userDetails.email;
        }
        if (userDetails.profilePicture) {
          user.profilePicture = userDetails.profilePicture;
        }
        if (userDetails.gender) {
          user.gender = userDetails.gender;
        }

        await user.save();
        return {
          msg: {
            msg: "update successfull",
            user: user,
          },
          statusCode: 201,
        };
      } else {
        throw new customError("user not found", 400);
      }
    } else {
      throw new customError("userId not found", 400);
    }
  } catch (err) {
    throw err;
  }
};
