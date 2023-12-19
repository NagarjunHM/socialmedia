import mongoose from "mongoose";
import { postModel } from "../posts/postSchema.js";
import { commentModel } from "./commentSchema.js";
import { userModel } from "../users/userSchema.js";
import customError from "../../middlewares/errorHandlerMiddleware.js";

// add comment
export const addComment = async (commentDetails) => {
  // session start
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const validPost = await postModel
      .findById(commentDetails.postId)
      .session(session);

    if (!validPost) {
      throw new customError("post does not exist", 404);
    }

    const newComment = new commentModel({ ...commentDetails });
    await newComment.save({ session });

    validPost.commentId.push(newComment._id);
    const user = await userModel
      .findById(commentDetails.userId)
      .session(session);
    user.commentId.push(newComment._id);

    await validPost.save({ session });
    await user.save({ session });

    // Commit the transaction
    await session.commitTransaction();

    return {
      statusCode: 201,
      msg: { msg: "comment created", comment: newComment },
    };
  } catch (err) {
    // Abort the transaction on error
    await session.abortTransaction();
    throw err;
  } finally {
    // End the session
    session.endSession();
  }
};

// fetch comments of a post
export const fetchPostComments = async (postId) => {
  try {
    const comments = await commentModel.find({ postId: postId });
    if (comments) {
      return { statusCode: 200, msg: comments };
    } else {
      return { statusCode: 404, msg: "no comments" };
    }
  } catch (err) {
    throw err;
  }
};

// delete comment
export const deleteComment = async (commentId) => {
  // start session
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const deletedComment = await commentModel.findByIdAndDelete(commentId, {
      session,
    });

    if (!deletedComment) {
      return { statusCode: 404, msg: { error: "Comment not found" } };
    }

    // deleting the CommentId from userModel
    const user = await userModel
      .findById(deletedComment.userId)
      .session(session);

    const userCommentIndex = user.commentId.indexOf(commentId);
    if (userCommentIndex !== -1) {
      user.commentId.splice(userCommentIndex, 1);
      await user.save({ session });
    }

    // deleting the CommentId from postModel
    const post = await postModel
      .findById(deletedComment.postId)
      .session(session);

    const postCommentIndex = post.commentId.indexOf(commentId);
    if (postCommentIndex !== -1) {
      post.commentId.splice(postCommentIndex, 1);
      await post.save({ session });
    }

    await session.commitTransaction();
    return {
      statusCode: 200,
      msg: {
        msg: "Comment deleted successfully",
        deletedComment: deletedComment,
      },
    };
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

// update comment
export const updateComment = async (commentId, newComment) => {
  try {
    const commentDetails = await commentModel.findById(commentId);
    if (!commentDetails) {
      throw new customError("comment not found", 404);
    }

    if (newComment) {
      commentDetails.comment = newComment;
      await commentDetails.save();
      return {
        statusCode: 201,
        msg: { msg: "comment updated", comment: commentDetails },
      };
    } else {
      throw new customError("comment cannot be empty", 400);
    }
  } catch (err) {
    throw err;
  }
};
