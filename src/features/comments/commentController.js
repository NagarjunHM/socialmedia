import { addComment } from "./commentRepository.js";

export const addCommentController = async (req, res, next) => {
  try {
    const { statusCode, msg } = await addComment({
      userId: req.userId,
      postId: req.params.postId,
      comment: req.body.comment,
    });
    res.status(statusCode).json(msg);
  } catch (err) {
    next(err);
  }
};
