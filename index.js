import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./src/features/user/user.routes.js";
import postRouter from "./src/features/post/post.routes.js";
import commentRouter from "./src/features/comment/cooment.routes.js";
import likeRouter from "./src/features/like/like.routes.js";
import friendshipRouter from "./src/features/friendship/friendship.routes.js";
import otpRouter from "./src/features/otp/otp.routes.js";
import cookieParser from "cookie-parser";
import { appLevelErrorHandlerMiddleware } from "./src/middlewares/errorHandler.js";



dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);
app.use("/api/friends", friendshipRouter);
app.use("/api/otp", otpRouter);

app.use(appLevelErrorHandlerMiddleware);

export default app;
