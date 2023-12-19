import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  likeId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
});

export const commentModel = mongoose.model("Comment", commentSchema);
