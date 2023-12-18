import express from "express";
import { postImageUpload } from "../../middlewares/fileUploadMiddleware.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import {
  createPostController,
  deletePostController,
} from "./postController.js";

const router = express.Router();

router.post("/", authMiddleware, postImageUpload, createPostController);
router.delete("/:postId", authMiddleware, deletePostController);

export default router;
