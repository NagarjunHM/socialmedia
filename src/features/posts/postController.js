import { createPost } from "./postRepository.js";

export const createPostController = async (req, res, next) => {
  try {
    const postDetails = { ...req.body, postImage: req.file.path };
    console.log(req.userId);
    const result = await createPost(req.userId, postDetails);
    res.status(result.statusCode).json(result.msg);
  } catch (err) {
    next(err);
  }
};
