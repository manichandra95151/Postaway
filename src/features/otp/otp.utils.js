import nodemailer from "nodemailer";
import otpGenerator from 'otp-generator'
import bcrypt from "bcrypt";


export const mailSender = async (email, otp) => {
    try {
        // Create a Transporter to send emails
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "codingninjas2k16@gmail.com",
                pass: "slwvvlczduktvhdj",
            }
        });
        // Send emails to users
        let info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "OTP Verification",
            html: otp,
        });
        console.log("Email info: ", info);
        return info;
    } catch (error) {
        console.log(error.message);
    }
};

export const generateOTP = () => {
    const otp = otpGenerator.generate(6, { alphabets: false, specialChars: false });
    return otp;
};




export const hashPassword = async (password, next) => {
    try {
        return await bcrypt.hash(password, 12);
    } catch (error) {
        next(new customErrorHandler(400, "encounterd error in hashing password"));
    }
};
export const compareHashedPassword = async (password, hashPassword, next) => {
    try {
        return await bcrypt.compare(password, hashPassword);
    } catch (error) {
        next(
            new customErrorHandler(
                400,
                "encounterd error in comparing hashed password"
            )
        );
    }
};
