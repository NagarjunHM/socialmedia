import { userModel } from "../users/userSchema.js";
import { otpModel } from "./otpSchema.js";
import speakeasy from "speakeasy";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import customError from "../../middlewares/errorHandlerMiddleware.js";

// Function to send an email using Nodemailer
const sendEmail = async (to, subject, text) => {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Your email username
        pass: process.env.PASS, // Your email password
      },
    });

    // Define email options
    const mailOptions = {
      from: process.env.EMAIl, // Sender's email address
      to: to, // Recipient's email address
      subject: subject, // Email subject
      text: text, // Email body
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw err;
  }
};

// sending otp to email
export const otpSend = async (email) => {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return { statusCode: 404, msg: "email not found" };
    }

    // Generate the TOTP token
    const token = speakeasy.totp({
      secret: "KVKFKRCPNZQUYMLXOVYDSQKJK",
      encoding: "base32",
    });

    // Send the TOTP via email
    await sendEmail(user.email, "Your TOTP", `Your TOTP is: ${token}`);

    const otpRecordExist = await otpModel.findOne({ userId: user._id });
    if (otpRecordExist) {
      otpRecordExist.otp = token;
      otpRecordExist.save();
      return { statusCode: 200, msg: "TOTP sent successfully" };
    }

    const newOtp = new otpModel({ email, userId: user._id, otp: token });
    await newOtp.save();

    return { statusCode: 200, msg: "TOTP sent successfully" };
  } catch (err) {
    throw err;
  }
};

// verifying the otp and resetting the password
export const optVerificationAndResetPassword = async (
  email,
  token,
  newPassword
) => {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return { statusCode: 404, msg: "user not found" };
    }

    const validOtp = await otpModel.findOne({ userId: user._id, otp: token });
    if (!validOtp) {
      return { statusCode: 404, msg: "invalid otp" };
    }

    // Verify the TOTP token
    const isValid = speakeasy.totp.verify({
      secret: "KVKFKRCPNZQUYMLXOVYDSQKJK",
      encoding: "base32",
      token: token,
      window: 1, // Adjust the window as needed
    });

    if (!isValid) {
      throw new customError("otp is expired", 400);
    }

    if (newPassword || newPassword.trim() !== "") {
      // hasinh password
      const password = await bcrypt.hash(newPassword, 10);

      // saving password in userModel
      user.password = password;
      await user.save();

      await otpModel.deleteOne({ userId: user._id, otp: token });

      return { statusCode: 201, msg: "password changed successfully" };
    } else {
      throw new customError("password cannot be empty", 400);
    }
  } catch (err) {
    throw err;
  }
};
