import {
  userSignUp,
  userSignIn,
  userLogOut,
  userLogOutAllDevices,
  getAllUsersDetails,
  getDetails,
} from "./userRepository.js";

// user sign up
export const userSignUpController = async (req, res, next) => {
  try {
    const result = await userSignUp(req.body, req.file);
    res.status(result.statusCode).json(result.msg);
  } catch (err) {
    next(err);
  }
};

// user sign in
export const userSignInController = async (req, res, next) => {
  try {
    const result = await userSignIn(req.body);
    const oneDay = 24 * 60 * 60 * 1000;
    res.cookie("jwtToken", result.msg.token, {
      httpOnly: true,
      maxAge: oneDay,
    });

    res.status(result.statusCode).json(result.msg);
  } catch (err) {
    next(err);
  }
};

// user log out
export const userLogOutController = async (req, res, next) => {
  try {
    const result = await userLogOut(req.cookies.jwtToken);
    res.status(result.statusCode).json(result.msg);
  } catch (err) {
    next(err);
  }
};

// user log out from all devices
export const userLogOutAllDevicesController = async (req, res, next) => {
  try {
    const result = await userLogOutAllDevices(req.cookies.jwtToken);
    res.status(result.statusCode).json(result.msg);
  } catch (err) {
    next(err);
  }
};

// get all user details
export const getAllUsersDetailsController = async (req, res, next) => {
  try {
    const { statusCode, msg } = await getAllUsersDetails();
    res.status(statusCode).json(msg);
  } catch (err) {
    next(err);
  }
};

// get specific user details
export const getDetailsController = async (req, res, next) => {
  try {
    const { statusCode, msg } = await getDetails(req.params.userId);
    res.status(statusCode).json(msg);
  } catch (err) {
    next(err);
  }
};
