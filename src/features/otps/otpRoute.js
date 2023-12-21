import express from "express";
import {
  optSendController,
  optVerificationAndResetPasswordController,
} from "./otpController.js";

const router = express.Router();

router.post("/send", optSendController);

router.post("/reset-password", optVerificationAndResetPasswordController);

export default router;
