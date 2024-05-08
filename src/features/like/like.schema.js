import mongoose from 'mongoose';

export const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }
});
