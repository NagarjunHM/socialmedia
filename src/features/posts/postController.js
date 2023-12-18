import { createPost, deletePost } from "./postRepository.js";

// create new post
export const createPostController = async (req, res, next) => {
  try {
    const postDetails = { ...req.body, postImage: req.file.path };
    const { statusCode, msg } = await createPost(req.userId, postDetails);
    res.status(statusCode).json(msg);
  } catch (err) {
    next(err);
  }
};

// delete old post
export const deletePostController = async (req, res, next) => {
  try {
    const { statusCode, msg } = await deletePost(req.userId, req.params.postId);
    res.status(statusCode).json(msg);
  } catch (err) {
    next(err);
  }
};
