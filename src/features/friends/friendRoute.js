import express from "express";
import {
  getFriendsController,
  getPendingFriendsReqController,
  responseToRequestController,
  toggleFriendsController,
} from "./friendController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get-friends/:userId", getFriendsController);
router.get(
  "/get-pending-requests",
  authMiddleware,
  getPendingFriendsReqController
);
router.put(
  "/toggle-friendship/:friendId",
  authMiddleware,
  toggleFriendsController
);
router.put(
  "/response-to-request/:friendId",
  authMiddleware,
  responseToRequestController
);

export default router;
