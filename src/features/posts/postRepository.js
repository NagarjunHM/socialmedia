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

// fetch posts of all users
export const fetchAllPost = async () => {
  try {
    const allPost = await postModel.find();

    if (allPost) {
      return { statusCode: 200, msg: { msg: "all posts", posts: allPost } };
    } else {
      return { statusCode: 200, msg: "no posts found" };
    }
  } catch (err) {
    throw err;
  }
};

// fetch post based on post id
export const fetchPostById = async (postId) => {
  try {
    const post = await postModel.findById(postId);

    if (post) {
      return {
        statusCode: 200,
        msg: { msg: "post successfully retreived", posts: post },
      };
    } else {
      return { statusCode: 200, msg: "no post found" };
    }
  } catch (err) {
    throw err;
  }
};

// fetch all users post
export const fetchAllUserPost = async (userId) => {
  try {
    const post = await postModel.find({ userId: userId });

    if (post.length > 0) {
      return { statusCode: 200, msg: { msg: "all users post", posts: post } };
    } else {
      return { statusCode: 404, msg: { msg: "no posts" } };
    }
  } catch (err) {
    throw err;
  }
};

// update post
export const updatePost = async (postId, newDetail) => {
  try {
    const postDetails = await postModel.findById(postId);
    if (postDetails) {
      const imagePath = postDetails.postImage;

      if (newDetail.caption) {
        postDetails.caption = newDetail.caption;
      }

      if (newDetail.postImage) {
        postDetails.postImage = newDetail.postImage;
      }

      await postDetails.save();
      deleteOldUploads(imagePath);
      return {
        statusCode: 200,
        msg: { msg: "post modified", post: postDetails },
      };
    } else {
      return { statusCode: 404, msg: "post not found" };
    }
  } catch (err) {
    throw err;
  }
};
