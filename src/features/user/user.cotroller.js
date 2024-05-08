import {
  updateUserPasswordRepo,
  userLoginRepo,
  userRegisterationRepo, userLogoutAllDevicesRepo, getdetailsRepo, getalldetailsRepo, UpdateUserdetailsRepo
} from "./user.repository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { customErrorHandler } from "../../middlewares/errorHandler.js";

export const userRegisteration = async (req, res, next) => {
  let { password } = req.body;
  password = await bcrypt.hash(password, 12);
  const resp = await userRegisterationRepo({ ...req.body, password });
  if (resp.success) {
    res.status(201).json({
      success: true,
      msg: "user registration successful",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
export const userLogin = async (req, res, next) => {
  const resp = await userLoginRepo(req.body);
  if (resp.success) {
    const token = jwt.sign(
      { _id: resp.res._id, user: resp.res },
      "codinNinjas",
      {
        expiresIn: "1h",
      }
    );
    res
      .cookie("jwtToken", token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true })
      .json({ success: true, msg: "user login successful", token });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
export const updateUserPassword = async (req, res, next) => {
  const { newPassword } = req.body;
  const resp = await updateUserPasswordRepo(req._id, newPassword, next);
  if (resp.success) {
    res.status(201).json({
      success: true,
      msg: "password updated successfully",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

export const userLogout = (req, res, next) => {
  res.clearCookie("jwtToken").json({ success: true, msg: "logout successful" });
};
export const userLogoutAllDevices = async (req, res, next) => {
  const userId = req._id;
  console.log("userId", userId);

  const resp = await userLogoutAllDevicesRepo(userId);
  console.log("resp", resp);
  if (resp.success) {
    res.clearCookie("jwtToken").json({ success: true, msg: "Logged out from all devices successfully" });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
export const getdetails = async (req, res, next) => {
  const userId = req.params.userId;
  console.log("userId", userId);
  const resp = await getdetailsRepo(userId);
  if (resp.success) {
    res.status(201).json({
      success: true,
      msg: "user details fetched successfully",
      res: resp.res,
    });
  }
  else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

export const getalldetails = async (req, res, next) => {
  const resp = await getalldetailsRepo();
  if (resp.success) {
    res.status(201).json({
      success: true,
      msg: "user details fetched successfully",
      res: resp.res,
    });
  }
  else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

export const updateUserDetails = async (req, res, next) => {
  const userId = req.params.userId;
  const { name, email, gender } = req.body;
  const data = { name, email, gender }
  const resp = await UpdateUserdetailsRepo(userId, data);
  if (resp.success) {
    res.status(201).json({
      success: true,
      msg: "user details fetched successfully",
      res: resp.res,
    });
  }
  else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg
    ));
  }
};
