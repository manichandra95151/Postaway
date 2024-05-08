import mongoose from "mongoose";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { CommentSchema } from "./comment.schema.js";
import { PostModel } from "../post/post.repository.js";
import { Types } from 'mongoose';
import { ObjectId } from "mongodb"

const CommentModel = mongoose.model("comments", CommentSchema);


export const addComment = async (commentData) => {
  try {
    console.log(commentData);
    const newComment = new CommentModel(commentData);
    const savedComment = await newComment.save();
    savedComment.userId = commentData.userId;
    return { success: true, res: savedComment };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error.message } };
  }
};

export const getComments = async (postId) => {
  try {
    const comments = await CommentModel.find({ postId });
    console.log(comments);
    if (!comments) {
      return {
        success: false,
        error: { statusCode: 404, msg: "Comments not found" },
      };
    } else {
      return { success: true, res: comments };
    }
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error.message } };
  }
};

export const updateCommentRepo = async (commentId, comment, loginUserId) => {
  try {
    const Originalcomment = await CommentModel.findOne({ _id: commentId });
    const conloginusid = new ObjectId(loginUserId);
    console.log(conloginusid);
    const userId = Originalcomment.userId;
    console.log(userId);
    const Post = await PostModel.findOne({ _id: Originalcomment.postId });
    const postedUserId = Post.userId;
    console.log(postedUserId);
    if((!conloginusid.equals(postedUserId) ) && (!conloginusid.equals(userId) )){
      return {
        success: false,
        error: { statusCode: 401, msg: "Unauthorized" },
      };
    }
    else{
    const updatedComment = await CommentModel.updateOne(
      { _id: commentId },
      { $set: { content: comment } },
    );
    if (updatedComment.nModified === 0) {
      return {
        success: false,
        error: { statusCode: 404, msg: "Comment not found" },
      };
    } else {
      return { success: true, res: updatedComment };
    }
    }

  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error.message } };
  }
};

export const deleteCommentRepo = async (commentId, loginUserId) => {
  try {
    const Originalcomment = await CommentModel.findOne({ _id: commentId });
    const conloginusid = new ObjectId(loginUserId);
    console.log(conloginusid);
    const userId = Originalcomment.userId;
    console.log(userId);
    const Post = await PostModel.findOne({ _id: Originalcomment.postId });
    const postedUserId = Post.userId;
    console.log(postedUserId);
    if((!conloginusid.equals(postedUserId) ) && (!conloginusid.equals(userId) )){
    return {
      success: false,
      error: { statusCode: 401, msg: "Unauthorized" },
    };
    }
    else{
    const deletedComment = await CommentModel.deleteOne({ _id: commentId });
    if (deletedComment.deletedCount === 0) {
      return {
        success: false,
        error: { statusCode: 404, msg: "Comment not found" },
      };
    } else {
      return { success: true, res: deletedComment };
    }
    }

  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error.message } };
  }
};


