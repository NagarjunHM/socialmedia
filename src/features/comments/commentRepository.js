import { postModel } from "../posts/postSchema.js";
import { commentModel } from "./commentSchema.js";
import { userModel } from "../users/userSchema.js";

// add comment
export const addComment = async (commentDetails) => {
  try {
    const validPost = await postModel.findById(commentDetails.postId);
    if (validPost) {
      const newComment = new commentModel({ ...commentDetails });
      await newComment.save();

      //   checking the state of new comment and then saving ref of comment in post and user models
      if (newComment) {
        validPost.commentId.push(newComment._id);
        const user = await userModel.findById(commentDetails.userId);
        user.commentId.push(newComment._id);
        await validPost.save();
        await user.save();
      }
      return {
        statusCode: 201,
        msg: { msg: "comment created", comment: newComment },
      };
    } else {
      throw new customError("post does not exist", 404);
    }
  } catch (err) {
    throw err;
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
  try {
    const comment = await commentModel.findByIdAndDelete(commentId);
  } catch (err) {
    throw err;
  }
};

// update comment
export const updateComment = async (commentId) => {
  try {
  } catch (err) {
    throw err;
  }
};
