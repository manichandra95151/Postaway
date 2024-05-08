import { addComment, getComments, updateCommentRepo, deleteCommentRepo } from "./comment.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import fs from "fs";
import path from "path";

export const PostComment = async (req, res, next) => {
  try {
    const userId = req._id;
    const { postId } = req.params;
    const { content } = req.body;
    console.log(userId);
    const resp = await addComment({ userId, content, postId });
    if (resp.success) {
      res.status(201).json({
        success: true,
        msg: "Comment posted successfully",
        res: resp.res,
      });
    }
    else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  } catch (error) {
    next(new customErrorHandler(500, "Failed to comment"));
  }
};

export const GetComments = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const resp = await getComments(postId);
    if (resp.success) {
      res.status(200).json({
        success: true,
        msg: "Comments found successfully",
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  } catch (error) {
    next(new customErrorHandler(500, "Failed to get comments"));
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const loginUserId = req._id;
    console.log(loginUserId);
    const { commentId } = req.params;
    const { content } = req.body;
    const resp = await updateCommentRepo(commentId, content, loginUserId);
    if (resp.success) {
      res.status(200).json({
        success: true,
        msg: "Comment updated successfully",
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  } catch (error) {
    next(new customErrorHandler(500, "Failed to update comment"));
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const loginUserId = req._id;
    console.log(loginUserId);
    const { commentId } = req.params;
    const resp = await deleteCommentRepo(commentId, loginUserId);
    if (resp.success) {
      res.status(200).json({
        success: true,
        msg: "Comment deleted successfully",
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  } catch (error) {
    next(new customErrorHandler(500, "Failed to delete comment"));
  }
};



