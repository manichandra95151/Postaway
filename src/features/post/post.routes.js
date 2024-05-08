import express from "express";
import {
    createPost, getByPostId, getPostsByUserId, updatePost, deletePost,
} from "./post.cotroller.js";
import { auth } from "../../middlewares/jwtAuth.js";
import { upload } from "../../middlewares/fileupload.js"; // import the upload middleware

const router = express.Router();

// GET all posts
// router.route("/all").get(getAllPosts);

// // GET post by ID
router.route("/:postId").get(getByPostId);

// // POST: Retrieve posts by user ID
router.route("/").get(auth, getPostsByUserId);

// POST: Create a new post

router.post("/", auth, upload.single('imageUrl'), createPost);

// // PUT: Update post by ID (requires authentication)
router.route("/:postId").put(auth, upload.single('imageUrl'), updatePost);

// // DELETE: Delete post by ID (requires authentication)
router.route("/:postId").delete(auth, deletePost);

export default router;

