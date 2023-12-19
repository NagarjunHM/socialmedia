import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likedItem: { type: mongoose.Schema.Types.ObjectId, refPath: "likedType" },
    likedType: { type: String, enum: ["Post", "Comment"], required: true },
  },
  { timestamps: true }
);

export const likeModel = mongoose.model("Like", likeSchema);
