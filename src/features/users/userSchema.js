import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "name is required"] },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"] },
  activeSessions: { type: Array },
  profilePicture: { type: String },
  postId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  commentId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

export const userModel = mongoose.model("User", userSchema);
