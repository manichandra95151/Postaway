import { createPostRepo, getByPostIdRepo, getPostsByUserIdRepo, updatePostRepo, deletePostRepo } from "./post.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import fs from "fs";
import path from "path";

export const createPost = async (req, res, next) => {
  try {
    const imageUrl = req.file.path;
    const userId = req._id;
    console.log(userId);
    const resp = await createPostRepo({ ...req.body, imagePath: imageUrl, userId });
    if (resp.success) {
      res.status(201).json({
        success: true,
        msg: "Post created successfully",
        res: resp.res,
      });
    } else {
      // delete the uploaded image if post creation failed
      fs.unlinkSync(req.file.path);
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  } catch (error) {
    next(new customErrorHandler(500, "Failed to create post"));
  }
};

export const getByPostId = async (req, res, next) => {
  try {
    const resp = await getByPostIdRepo(req.params.postId);
    if (resp.success) {
      res.status(200).json({
        success: true,
        msg: "Post found successfully",
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  } catch (error) {
    next(new customErrorHandler(500, "Failed to create post"));
  }
};

export const getPostsByUserId = async (req, res, next) => {
  try {
    const userId = req._id;
    console.log(userId);
    const resp = await getPostsByUserIdRepo(userId);
    if (resp.success) {
      res.status(200).json({
        success: true,
        msg: "Posts found successfully",
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  } catch (error) {
    next(new customErrorHandler(500, "Failed to create post"));
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const userId = req._id;
    const postId = req.params.postId;


    if (req.file) {
      const imageUrl = req.file.path;
      req.body.imagePath = imageUrl;
    }
    console.log(req.body);
    const resp = await updatePostRepo(postId, req.body,userId);

    if (resp.success) {
      res.status(200).json({
        success: true,
        msg: "Post updated successfully",
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  } catch (error) {
    next(new customErrorHandler(500, "Failed to update post"));
  }
};


export const deletePost = async (req, res, next) => {
  try {
    const userId = req._id;
    const postId = req.params.postId;
    const resp = await deletePostRepo(postId,userId);
    if (resp.success) {
      res.status(200).json({
        success: true,
        msg: "Post deleted successfully",
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
  } catch (error) {
    next(new customErrorHandler(500, "Failed to delete post"));
  }
};