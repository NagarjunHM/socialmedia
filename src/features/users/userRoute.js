import express from "express";
import {
  userSignUpController,
  userSignInController,
  userLogOutController,
  userAlldeviceLogoutController,
} from "./userController.js";

const router = express.Router();

router.post("/signup", userSignUpController);
router.get("/signin", userSignInController);
router.get("/logout", userLogOutController);
router.get("/all-device-logout", userAlldeviceLogoutController);

export default router;
