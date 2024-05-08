import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import {
  compareHashedPassword,
  hashPassword,
} from "../../utils/hashPassword.js";
import jwt from "jsonwebtoken";

export const UserModel = mongoose.model("User", userSchema);

export const userRegisterationRepo = async (userData) => {
  try {
    const newUser = new UserModel(userData);
    await newUser.save();
    return { success: true, res: newUser };
  } catch (error) {
    // throw new Error("email duplicate");
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};
export const userLoginRepo = async (userData) => {
  try {
    const { email, password } = userData;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        success: false,
        error: { statusCode: 404, msg: "User not found" },
      };
    } else {
      let passwordValidation = await compareHashedPassword(
        password,
        user.password
      );
      if (passwordValidation) {
        // Generate a new token
        const token = jwt.sign({ _id: user._id }, "codinNinjas", {
          expiresIn: "1h",
        });

        // Add the new token to the user's tokens array
        user.tokens.push(token);
        await user.save();

        return { success: true, res: { user, token } };
      } else {
        return {
          success: false,
          error: { statusCode: 400, msg: "Invalid credentials" },
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 500, msg: error.message },
    };
  }
};

export const updateUserPasswordRepo = async (_id, newpassword, next) => {
  try {
    const user = await UserModel.findOne({ _id });
    if (!user) {
      return {
        success: false,
        error: { statusCode: 404, msg: "user not found" },
      };
    } else {
      const newHashedPassword = await hashPassword(newpassword, next);
      user.password = newHashedPassword;
      let updatedUser = await user.save();
      return { success: true, res: updatedUser };
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

export const userLogoutAllDevicesRepo = async (userId) => {
  try {
    const user = await UserModel.findOne({ userId });
    if (!user) {
      return {
        success: false,
        error: { statusCode: 404, msg: "User not found" },
      };
    } else {
      // Clear all tokens for the user
      user.tokens = [];
      await user.save();
      return { success: true };
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 500, msg: error.message },
    };
  }
};

export const getdetailsRepo = async (userId) => {
  try {
    const user = await UserModel.findOne({ _id: userId }).select("-password -tokens");

    if (!user) {
      return {
        success: false,
        error: { statusCode: 404, msg: "User not found" },
      };
    } else {
      return { success: true, res: user };
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 500, msg: error.message },
    };
  }
};


export const getalldetailsRepo = async () => {
  try {
    const users = await UserModel.find().select("-password -tokens");
    if (!users) {
      return {
        success: false,
        error: { statusCode: 404, msg: "User not found" },
      };
    } else {
      return { success: true, res: users };
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 500, msg: error.message },
    };
  }
};

export const UpdateUserdetailsRepo = async (userId, userData) => {
  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return {
        success: false,
        error: { statusCode: 404, msg: "User not found" },
      };
    } else {
      user.name = userData.name;
      user.email = userData.email;
      user.gender = userData.gender;
      let updatedUser = await user.save();
      return { success: true, res: updatedUser };
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 500, msg: error.message },
    };
  }
};


