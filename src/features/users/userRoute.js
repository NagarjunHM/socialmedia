import express from "express";
import {
  userSignUpController,
  userSignInController,
  userLogOutController,
  userLogOutAllDevicesController,
  getAllUsersDetailsController,
  getDetailsController,
} from "./userController.js";
import { profilePictureUpload } from "../../middlewares/fileUploadMiddleware.js";

const router = express.Router();

router.post("/signup", profilePictureUpload, userSignUpController);
router.get("/signin", userSignInController);
router.post("/logout", userLogOutController);
router.post("/logout-all-devices", userLogOutAllDevicesController);
router.get("/get-all-details", getAllUsersDetailsController);
router.get("/get-details/:userId", getDetailsController);

export default router;
