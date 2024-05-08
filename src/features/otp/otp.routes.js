import express from "express";
import {
    sendOTPController, verifyOTPController, resetPasswordController
    ,
} from "./otp.contoller.js";
import { auth } from "../../middlewares/jwtAuth.js";


const router = express.Router();


router.route("/send").post(auth, sendOTPController);

router.route("/verify").post(verifyOTPController);

router.route("/reset-password").post(resetPasswordController);

export default router;