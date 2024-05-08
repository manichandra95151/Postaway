import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { getLikesRepo, likeRepo } from "./like.repository.js";

export const like = async (req, res, next) => {
  const id = req.params;
  const { type } = req.query;
  const userId = req._id;
  console.log(req.query);
  if ((!type || !id) || (type !== "Post" && type !== "Comment")) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide a valid type and id" });
  }
  try {
    const resp = await likeRepo(userId, { type, id });
    if (resp) {
      res
        .status(201)
        .json({ success: true, resp });
    }
  } catch (error) {
    next(new customErrorHandler(400, error.message));
  }
};


export const getlikes = async (req, res, next) => {
  const id = req.params;
  try {
    const resp = await getLikesRepo({ id });
    if (resp) {
      res
        .status(200)
        .json({ success: true, resp });
    }
  } catch (error) {
    next(new customErrorHandler(400, error.message));
  }
};
