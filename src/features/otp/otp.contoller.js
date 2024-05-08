// Import necessary modules and functions

import { generateOTP, mailSender } from './otp.utils.js'; // Implement these utility functions
import { sendOTP, verifyOTP, OTPModel, updateUserPasswordRepo } from './otp.repository.js'; // Import the OTP repository


export const sendOTPController = async (req, res, next) => {
    try {
        const userId = req._id; // email is provided in the request body
        const { email } = req.body;
        const sendOTPResult = await sendOTP(email, userId);
        if (sendOTPResult.success) {
            res.status(201).json({ success: true, message: "OTP sent successfully", data: sendOTPResult.data });
        } else {
            res.status(sendOTPResult.error.statusCode).json({ success: false, message: sendOTPResult.error.msg });
        }
    } catch (error) {
        next(error);
    }
};




export const verifyOTPController = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const verification = await verifyOTP(email, otp); // email and otp are provided in the request body
        if (verification.success) {
            res.status(200).json({ success: true, message: "OTP verified successfully" });
        } else {
            res.status(400).json({ success: false, message: "Invalid OTP" });
        }
    } catch (error) {
        next(error);
    }
};


export const resetPasswordController = async (req, res, next) => {
    try {
        const { email, newpassword } = req.body;
        const newPasswordUpdate = await updateUserPasswordRepo(email, newpassword);

        if (!newPasswordUpdate) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' })
        }
        res.status(200).json({ success: true, message: 'Password updated successfully' })

    }
    catch (error) {
        next(error)
    }
}
