import express from "express";
import {
  otpSendController,
  otpVerificationAndResetPasswordController,
} from "./otpController.js";

const router = express.Router();

router.post("/send", otpSendController);

router.post("/reset-password", otpVerificationAndResetPasswordController);

export default router;
