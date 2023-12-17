import { userSignUp, userSignIn, userLogOut } from "./userRepository.js";

// user sign up
export const userSignUpController = async (req, res, next) => {
  try {
    const result = await userSignUp(req.body);
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
export const userAlldeviceLogoutController = async (req, res, next) => {
  try {
    const result = await userAlldeviceLogoutController(req.cookies.jwtToken);
    res.status(result.statusCode).json(result.msg);
  } catch (err) {
    next(err);
  }
};
