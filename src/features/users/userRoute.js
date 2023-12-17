import express from "express";
import {
  userSignUpController,
  userSignInController,
  userLogOutController,
  userLogOutAllDevicesController,
} from "./userController.js";

const router = express.Router();

router.post("/signup", userSignUpController);
router.get("/signin", userSignInController);
router.post("/logout", userLogOutController);
router.post("/logout-all-devices", userLogOutAllDevicesController);

export default router;
