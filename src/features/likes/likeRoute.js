import express from "express";
import { getLikesController, toggleLikesController } from "./likeController.js";

const router = express.Router();

router.get("/:id", getLikesController);
router.put("/:id", toggleLikesController);
export default router;
