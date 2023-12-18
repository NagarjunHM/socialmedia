import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caption: { type: String },
    postImage: {
      type: String,
      required: [true, "image is required to create a post"],
    },
  },
  { timestamps: true }
);

export const postModel = mongoose.model("Post", postSchema);
