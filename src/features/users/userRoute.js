import express from "express";
import {
  userSignUpController,
  userSignInController,
  userLogOutController,
} from "./userController.js";

const router = express.Router();

router.post("/signup", userSignUpController);
router.get("/signin", userSignInController);
router.get("/logout", userLogOutController);

export default router;
