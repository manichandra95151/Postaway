// otp.repository.js

import mongoose from "mongoose";
import { otpSchema } from './otp.schema.js';
import { UserModel } from '../user/user.repository.js';
import { generateOTP, mailSender, hashPassword } from './otp.utils.js';

export const OTPModel = mongoose.model("otp", otpSchema);


export const sendOTP = async (email, userId) => {
    try {
        // Find user by userId
        console.log(email, userId)
        const user = await UserModel.findById(userId);
        if (!user) {
            return {
                success: false,
                error: { statusCode: 404, msg: "User not found" },
            };
        }

        // Generate OTP
        const otp = generateOTP();

        // Save OTP record in the database
        const otpRecord = new OTPModel({ email, otp });
        await otpRecord.save();

        // Send OTP via email
        await mailSender(email, otp);

        return { success: true, data: otpRecord };
    } catch (error) {
        return { success: false, error: { statusCode: 400, msg: error.message } };
    }
};




export const verifyOTP = async (email, otp) => {
    try {
        const otpRecord = await OTPModel.findOne({ email, otp });
        if (!otpRecord) {
            return { success: false, message: 'Invalid OTP' };
        }
        return { success: true };
    } catch (error) {
        throw error;
    }
};


export const updateUserPasswordRepo = async (email, newpassword) => {
    try {
        const user = await UserModel.findOne({ email });
        console.log(user);
        if (!user) {
            return {
                success: false,
                error: {
                    statusCode: 404,
                    msg: "User not found",
                },
            };
        }
        const hashedPassword = await hashPassword(newpassword);
        user.password = hashedPassword;
        const resp = await user.save();
        return { success: true, res: resp };
    } catch (error) {
        let statusCode = 500;
        let errorMsg = "Internal Server Error";

        if (error.name === 'ValidationError') {
            statusCode = 400;
            errorMsg = error.message;
        } else if (error.code === 11000) {
            statusCode = 409;
            errorMsg = "Duplicate entry";
        }

        return {
            success: false,
            error: {
                statusCode,
                msg: errorMsg,
            },
        };
    }
};



