import express from "express";
import { like, getlikes } from "./like.controller.js";
import { auth } from "../../middlewares/jwtAuth.js";
const router = express.Router();

// router.route("/like").post(auth, like);
router.route("/toggle/:id").post(auth, like);
router.route("/:id").get(getlikes);

export default router;
