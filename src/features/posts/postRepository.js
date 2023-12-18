import { userModel } from "../users/userSchema.js";
import { postModel } from "./postSchema.js";
import { deleteOldUploads } from "../../middlewares/fileUploadMiddleware.js";

// create new post
export const createPost = async (userId, postDetails) => {
  try {
    const newPost = new postModel({ userId: userId, ...postDetails });
    await newPost.save();

    if (newPost) {
      const user = await userModel.findById(userId);
      user.postId.push(newPost._id);
      await user.save();
    }
    return {
      statusCode: 201,
      msg: { msg: "post created successfully", post: newPost },
    };
  } catch (err) {
    throw err;
  }
};

// delete old post
export const deletePost = async (userId, postId) => {
  try {
    const deletedPost = await postModel.findOneAndDelete({
      _id: postId,
      userId: userId,
    });

    if (deletedPost) {
      // deleting the post from server
      deleteOldUploads(deletedPost.postImage);

      // deleting the postId from userModel
      const user = await userModel.findById(userId);
      const postIndex = user.postId.indexOf(postId);
      if (postIndex !== -1) {
        user.postId.splice(postIndex, 1);
        await user.save();
      } else {
        return { statusCode: 404, msg: "post not found" };
      }
    } else {
      return {
        statusCode: 404,
        msg: { error: "Post not found" },
      };
    }

    return {
      statusCode: 200,
      msg: { msg: "post deleted successfully", deletedPost: deletedPost },
    };
  } catch (err) {
    throw err;
  }
};
