import express from "express";
import {
    getFriends, getPendingRequests, toggleFriendship, respondToRequest
} from "./friendship.cotroller.js";
import { auth } from "../../middlewares/jwtAuth.js";


const router = express.Router();


router.route("/get-friends/:userId").get(auth, getFriends);

router.route("/get-pending-requests").get(auth, getPendingRequests);

router.route("/toggle-friendship/:friendId").get(auth, toggleFriendship);

router.route("/response-to-request/:friendId").get(auth, respondToRequest);


export default router;

