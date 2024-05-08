// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from 'mongoose';
import { likeSchema } from '../like/like.schema.js';
import { like } from './like.controller.js';

const Like = mongoose.model('Like', likeSchema);

export const likeRepo = async (user_id, likedata) => {
  try {
    const id = likedata.id.id;

    // Check if the user has already liked the item
    if (likedata.type === 'Post') {
      const existingLike = await Like.findOne({ userId: user_id, postId: id });
      if (existingLike) {
        // If existing like exists, remove it
        await Like.deleteOne({ _id: existingLike._id });
        return { liked: false, msg: "Post unliked successfully" }; // Like removed
      }

      // Create a new like for post
      const newLike = new Like({ userId: user_id, type: "Post", postId: id });
      await newLike.save();
      return { liked: true, msg: "Post liked successfully" }; // Like successful
    } else if (likedata.type === 'Comment') {
      const existingLike = await Like.findOne({ userId: user_id, commentId: id });
      if (existingLike) {
        // If existing like exists, remove it
        await Like.deleteOne({ _id: existingLike._id });
        return { liked: false, msg: "Comment unliked successfully" }; // Like removed
      }

      // Create a new like for comment
      const newLike = new Like({ userId: user_id, type: "Comment", commentId: id });
      await newLike.save();
      return { liked: true, msg: "Comment liked successfully" }; // Like successful
    }
  } catch (error) {
    throw new Error('Failed to like item: ' + error.message);
  }
};

export const getLikesRepo = async (id) => {
  try {

    console.log(id.id.id);
    const idd = id.id.id
    const likes = await Like.find({ $or: [{ postId: idd }, { commentId: idd }] });
    const likeCount = likes.length; // Get the number of likes
    return likeCount;
  } catch (error) {
    throw new Error('Failed to get likes: ' + error.message);
  }
};
