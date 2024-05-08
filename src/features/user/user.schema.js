import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minLength: [3, "The name should be at least 3 characters long"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
    match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/],
  },
  
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: [true, "gender is required"],
  },
  password: { type: String, required: [true, "password is required"] },

  tokens: [{
    type: String,
    required: true,
  }]
});
