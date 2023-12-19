import {
  addComment,
  deleteComment,
  fetchPostComments,
  updateComment,
} from "./commentRepository.js";

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

export const fetchPostCommentsController = async (req, res, next) => {
  try {
    const { statusCode, msg } = await fetchPostComments(req.params.postId);
    res.status(statusCode).json(msg);
  } catch (err) {
    next(err);
  }
};

export const updateCommentController = async (req, res, next) => {
  try {
    const { statusCode, msg } = await updateComment(
      req.params.commentId,
      req.body.comment
    );
    res.status(statusCode).json(msg);
  } catch (err) {
    next(err);
  }
};

export const deleteCommentController = async (req, res, next) => {
  try {
    const { statusCode, msg } = await deleteComment(req.params.commentId);
    res.status(statusCode).json(msg);
  } catch (err) {
    next(err);
  }
};
