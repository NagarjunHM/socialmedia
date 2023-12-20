import express from "express";
import { getLikesController, toggleLikesController } from "./likeController.js";
import { authMiddleware } from "./../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:id", getLikesController);
router.put("/:id", authMiddleware, toggleLikesController);
export default router;
