// schema.js
import mongoose from "mongoose";

export const CommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the UserModel
    required: true,
  },
  content: {
    type: String,
    required: [true, "Comment is required"],
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  }
});
