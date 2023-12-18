import express from "express";
import { postImageUpload } from "../../middlewares/fileUploadMiddleware.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import {
  createPostController,
  deletePostController,
  fetchAllPostController,
  fetchAllUserPostController,
  fetchPostByIdController,
  updatePostController,
} from "./postController.js";

const router = express.Router();

router.get("/all", fetchAllPostController);
router.get("/:postId", authMiddleware, fetchPostByIdController);
router.get("/", authMiddleware, fetchAllUserPostController);
router.post("/", authMiddleware, postImageUpload, createPostController);
router.delete("/:postId", authMiddleware, deletePostController);
router.put("/:postId", authMiddleware, postImageUpload, updatePostController);

export default router;
