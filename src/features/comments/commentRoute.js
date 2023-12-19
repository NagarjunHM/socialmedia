import express from "express";
import {
  addCommentController,
  deleteCommentController,
  fetchPostCommentsController,
  updateCommentController,
} from "./commentController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/:postId", authMiddleware, addCommentController);
router.get("/:postId", authMiddleware, fetchPostCommentsController);
router.put("/:commentId", authMiddleware, updateCommentController);
router.delete("/:commentId", authMiddleware, deleteCommentController);

export default router;
