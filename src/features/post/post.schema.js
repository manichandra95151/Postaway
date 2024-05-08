// schema.js
import mongoose from "mongoose";

export const PostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the UserModel
    required: true,
  },
  caption: {
    type: String,
    required: [true, "Caption is required"],
  },
  imagePath: {
    type: String,
    required: [true, "Image path is required"],
  },
});
