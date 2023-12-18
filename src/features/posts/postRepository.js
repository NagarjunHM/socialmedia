import { postModel } from "./postSchema.js";

export const createPost = async (userId, postDetails) => {
  try {
    const newPost = new postModel({ userId: userId, ...postDetails });
    await newPost.save();
    return {
      statusCode: 201,
      msg: { msg: "post created successfully", post: newPost },
    };
  } catch (err) {
    throw err;
  }
};
