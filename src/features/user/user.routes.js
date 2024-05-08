import express from "express";
import {
  updateUserPassword,
  userLogin,
  userLogout,
  userRegisteration, userLogoutAllDevices, getdetails, getalldetails, updateUserDetails
} from "./user.cotroller.js";
import { auth } from "../../middlewares/jwtAuth.js";


const router = express.Router();

router.route("/signup").post(userRegisteration);

router.route("/signin").post(userLogin);

router.route("/logout").get(userLogout);

router.route("/logout-all-devices").get(userLogoutAllDevices);

router.route("/get-details/:userId").get(getdetails);

router.route("/get-all-details").get(getalldetails);

router.route("/update-details/:userId").put(auth, updateUserDetails);

export default router;
