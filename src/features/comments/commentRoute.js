import express from "express";
import { addCommentController } from "./commentController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/:postId", authMiddleware, addCommentController);

export default router;
