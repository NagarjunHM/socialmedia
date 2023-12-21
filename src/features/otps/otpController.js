import { optVerificationAndResetPassword, otpSend } from "./otpRepository.js";

export const optSendController = async (req, res, next) => {
  try {
    const result = await otpSend(req.body.email);
    res.status(result.statusCode).json(result.msg);
  } catch (err) {
    next(err);
  }
};

export const optVerificationAndResetPasswordController = async (
  req,
  res,
  next
) => {
  try {
    const { email, otp, newPassword } = req.body;
    const result = await optVerificationAndResetPassword(
      email,
      otp,
      newPassword
    );
    res.status(result.statusCode).json(result.msg);
  } catch (err) {
    next(err);
  }
};
