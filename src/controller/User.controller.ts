import { Request, Response } from "express";
import User from "../model/User.model";
import { comparePassword, hashPassword } from "../middleware/bcrypt.middleware";
import { generateToken } from "../middleware/jwtToken.middleware";
import { IPayload } from "../@types/user.types";

export const RegisterUser = async (req: Request, res: Response) => {
  const body = req.body;
  console.log("body", body);
  // Registration logic will be implemented here in the future
  if (!body.firstName || !body.lastName || !body.email || !body.password) {
    return res.status(400).send("All required fields must be filled.");
  }

  const password = hashPassword(body.password);
  body.password = password;

  const isUserExist = await User.findOne({ email: body.email });
  if (isUserExist) {
    return res.status(409).send("User with this email already exists.");
  }

  const user = await User.create(body);

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
};

export const LoginUser = async (req: Request, res: Response) => {
  // Login logic will be implemented here in the future
  const body = req.body;
  if (!body.email || !body.password) {
    return res.status(400).send("Email and password are required.");
  }

  const user = await User.findOne({ email: body.email });
  if (!user) {
    return res.status(404).send("User not found.");
  }
  // Password verification logic will be added here
  const passwordIsValid = await comparePassword(body.password, user.password); // Placeholder for actual password validation

  if (!passwordIsValid) {
    return res.status(401).send("Invalid password.");
  }

  const payLoad: IPayload = { id: user._id, email: user.email };
  const token = generateToken(payLoad);
  res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({
      message: "Login successful",
      status: "sucess",
      statusCode: 200,
      data: user,
      token,
    });
};

// working on this function
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "user fetched sucessfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
