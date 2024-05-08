import mongoose from "mongoose";
import { PostSchema } from "./post.schema.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { ObjectId } from "mongodb"

export const PostModel = mongoose.model("posts", PostSchema);

export const createPostRepo = async (postData) => {
  try {
    console.log(postData);
    const newPost = new PostModel(postData);
    const savedPost = await newPost.save();
    savedPost.userId = postData.userId;
    return { success: true, res: savedPost };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error.message } };
  }
};

export const getByPostIdRepo = async (postId) => {
  try {
    const post = await PostModel.findOne({ _id: postId });
    if (!post) {
      return {
        success: false,
        error: { statusCode: 404, msg: "Post not found" },
      };
    } else {
      return { success: true, res: post };
    }
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error.message } };
  }
};

export const getPostsByUserIdRepo = async (userId) => {
  try {
    const posts = await PostModel.find({ userId });
    console.log(posts);
    if (!posts) {
      return {
        success: false,
        error: { statusCode: 404, msg: "Posts not found" },
      };
    } else {
      return { success: true, res: posts };
    }
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error.message } };
  }
};

export const updatePostRepo = async (postId, postData,userId) => {
  try {
    const post = await PostModel.findOne({ _id: postId });
    console.log(post.userId);
    const convusid = new ObjectId(userId);
    console.log(convusid);
   
    if (!convusid.equals(post.userId)) {
      return {
        success: false,
        error: { statusCode: 401, msg: "Unauthorized" },
      };
    }
    
    if (!post) {
      return {
        success: false,
        error: { statusCode: 404, msg: "Post not found" },
      };
    } else {
      post.caption = postData.caption;
      post.imagePath = postData.imagePath;
      let updatedPost = await post.save();
      return { success: true, res: updatedPost };
    }
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error.message } };
  }
};

export const deletePostRepo = async (postId, userId) => {
  try {
    const post = await PostModel.findById(postId);

    if (!post) {
      return {
        success: false,
        error: { statusCode: 404, msg: "Post not found" },
      };
    }
    console.log(post.userId);
    const convusid = new ObjectId(userId);
    console.log(convusid);
   
    if (!convusid.equals(post.userId)) {
      return {
        success: false,
        error: { statusCode: 401, msg: "Unauthorized" },
      };
    }

    await PostModel.deleteOne({ _id: postId });
    return { success: true };
  } catch (error) {
    return { success: false, error: { statusCode: 500, msg: error.message } };
  }
};
