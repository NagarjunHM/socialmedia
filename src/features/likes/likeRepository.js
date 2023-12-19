import { likeModel } from "./likeSchema.js";
import { postModel } from "../posts/postSchema.js";
import { commentModel } from "../comments/commentSchema.js";
import customError from "../../middlewares/errorHandlerMiddleware.js";

// fetch likes for post or comment
export const getLikes = async (likedItem) => {
  try {
    const likes = await likeModel.find({ likedItem });
    console.log(likes);
    if (likes.length === 0) {
      throw new customError("post or comment not found", 404);
    }

    return { statusCode: 200, msg: likes };
  } catch (err) {
    throw err;
  }
};

export const toggleLikes = async (likedItem, likedType, userId) => {
  try {
    // Check if the likedType is valid
    if (likedType !== "Post" && likedType !== "Comment") {
      throw new Error("Invalid likedType");
    }

    // Check if the likedType and likedItem match
    const itemModel = likedType === "Post" ? postModel : commentModel;
    const isValidItem = await itemModel.exists({ _id: likedItem });

    if (!isValidItem) {
      throw new customError("Invalid likedItem", 400);
    }

    // Check if the post is liked or not
    const existingLike = await likeModel.findOne({
      userId,
      likedItem,
      likedType,
    });

    if (existingLike) {
      // Remove like reference from the post or comment
      if (likedType === "Post") {
        await postModel.findByIdAndUpdate(likedItem, {
          $pull: { likeId: existingLike._id },
        });
      } else if (likedType === "Comment") {
        await commentModel.findByIdAndUpdate(likedItem, {
          $pull: { likeId: existingLike._id },
        });
      }

      await likeModel.findByIdAndDelete(existingLike._id);

      return { statusCode: 200, msg: "unliked" };
    } else {
      const newLike = new likeModel({
        userId,
        likedItem,
        likedType,
      });

      await newLike.save();

      // Add like reference to the post or comment
      if (likedType === "Post") {
        await postModel.findByIdAndUpdate(likedItem, {
          $push: { likeId: newLike._id },
        });
      } else if (likedType === "Comment") {
        await commentModel.findByIdAndUpdate(likedItem, {
          $push: { likeId: newLike._id },
        });
      }
      return { statusCode: 200, msg: "liked" };
    }
  } catch (err) {
    throw err;
  }
};
