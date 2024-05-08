// otp.schema.js
import mongoose from 'mongoose';

export const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        ref: 'User',
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600, // Set to expire in 10 minutes
    },
});


