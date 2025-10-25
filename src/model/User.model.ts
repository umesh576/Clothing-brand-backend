import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Firstname is required."],
      min: [2, "First name must be at least 2 characters long."],
      max: [30, "First name cannot exceed 30 characters."],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Lastname is required."],
      min: [2, "Last name must be at least 2 characters long."],
      max: [30, "Last name cannot exceed 30 characters."],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /\S+@\S+\.\S+/,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      min: [2, "Password must be at least 2 characters long."],
      max: [30, "Password cannot exceed 30 characters."],
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phoneNumber: {
      type: String,
      trim: true,
      min: [10, "Phone number must be at least 10 characters long."],
      max: [10, "Phone number cannot exceed 10 characters."],
    },
    location: {
      type: String,
      min: [2, "Location must be at least 2 characters long."],
      max: [100, "Location cannot exceed 50 characters."],
      trim: true,
    },
    profielPicture: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
