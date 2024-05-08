import mongoose from "mongoose";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { FriendshipSchema } from "./friendship.schema.js";




const Friendship = mongoose.model('Friendship', FriendshipSchema);


export const getFriendsRepo = async (userId) => {
  try {
    const friendships = await Friendship.find({
      $or: [{ user1: userId }, { user2: userId }],
      status: 'accepted',
    }).populate('user1 user2', 'username email');
    return friendships;
  } catch (error) {
    throw error;
  }
};

export const getPendingRequestsRepo = async (userId) => {
  try {
    const pendingRequests = await Friendship.find({
      user2: userId,
      status: 'pending',
    }).populate('user1', 'username email');
    return pendingRequests;
  } catch (error) {
    throw error;
  }
};

export const toggleFriendshipRepo = async (userId, friendId) => {
  try {
    const existingFriendship = await Friendship.findOne({
      $or: [
        { user1: userId, user2: friendId },
        { user1: friendId, user2: userId },
      ],
    });
    if (existingFriendship) {
      existingFriendship.status =
        existingFriendship.status === 'accepted' ? 'pending' : 'accepted';
      await existingFriendship.save();
      return existingFriendship;
    } else {
      const newFriendship = new Friendship({
        user1: userId,
        user2: friendId,
        status: 'pending',
      });
      await newFriendship.save();
      return newFriendship;
    }
  } catch (error) {
    throw error;
  }
};

export const respondToRequestRepo = async (userId, friendId, status) => {
  try {
    const existingFriendship = await Friendship.findOne({
      user2: userId,
      user1: friendId,
      status: 'pending',
    });
    if (!existingFriendship) {
      throw new Error('Friend request not found');
    }
    existingFriendship.status = status;
    await existingFriendship.save();
    return existingFriendship;
  } catch (error) {
    throw error;
  }
};
