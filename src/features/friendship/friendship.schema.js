// schema.js
// friendship.schema.js
import mongoose from 'mongoose';

export const FriendshipSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



