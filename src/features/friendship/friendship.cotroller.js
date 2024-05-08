import { getFriendsRepo, getPendingRequestsRepo, toggleFriendshipRepo, respondToRequestRepo } from "./friendship.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";



export const getFriends = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const friendships = await getFriendsRepo(userId); // Assuming User model has username and email fields
    res.status(200).json({ success: true, friendships });
  } catch (error) {
    next(error);
  }
};

export const getPendingRequests = async (req, res, next) => {
  try {
    const pendingRequests = await getPendingRequestsRepo(req._id);
    res.status(200).json({ success: true, pendingRequests });
  } catch (error) {
    next(error);
  }
};

export const toggleFriendship = async (req, res, next) => {
  try {
    const { friendId } = req.params;
    const user = req._id; // Assuming req.user contains the authenticated user's information
    const friendship = await toggleFriendshipRepo(user, friendId);
    res.status(201).json({ success: true, friendship });
  } catch (error) {
    next(error);
  }
};

export const respondToRequest = async (req, res, next) => {
  try {
    const { friendId } = req.params;
    const { status } = req.body;
    const userId = req.user._id;
    const friendship = await respondToRequestRepo(userId, friendId, status);
    if (!friendship) {
      return res.status(404).json({ success: false, message: 'Friend request not found' });
    }
    res.status(200).json({ success: true, friendship });
  } catch (error) {
    next(error);
  }
};


