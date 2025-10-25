import { Request, Response } from "express";
import User from "../model/User.model";
export const RegisterUser = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    phoneNumber,
    location,
    profielPicture,
  } = req.body;
  // Registration logic will be implemented here in the future
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send("All required fields must be filled.");
  }
  const newUser = {
    firstName,
    lastName,
    email,
    password,
    role,
    phoneNumber,
    location,
    profielPicture,
  };

  const user = await User.create(newUser);

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
};
