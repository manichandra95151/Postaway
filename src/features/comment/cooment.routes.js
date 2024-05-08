import express from "express";
import {
    PostComment, GetComments, updateComment, deleteComment
} from "./comment.cotroller.js";
import { auth } from "../../middlewares/jwtAuth.js";


const router = express.Router();


router.route("/:postId").post(auth, PostComment);

router.route("/:postId").get(GetComments);

router.route("/:commentId").put(auth, updateComment);

router.route("/:commentId").delete(auth, deleteComment);



export default router;

