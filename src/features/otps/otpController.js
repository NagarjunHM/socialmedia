import { otpVerificationAndResetPassword, otpSend } from "./otpRepository.js";

export const otpSendController = async (req, res, next) => {
  try {
    const result = await otpSend(req.body.email);
    res.status(result.statusCode).json(result.msg);
  } catch (err) {
    next(err);
  }
};

export const otpVerificationAndResetPasswordController = async (
  req,
  res,
  next
) => {
  try {
    const { email, otp, newPassword } = req.body;
    const result = await otpVerificationAndResetPassword(
      email,
      otp,
      newPassword
    );
    res.status(result.statusCode).json(result.msg);
  } catch (err) {
    next(err);
  }
};
