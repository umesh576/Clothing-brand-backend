import { Request, Response } from "express";
import User from "../model/User.model";
export const RegisterUser = async (req: Request, res: Response) => {
  const body = req.body;
  console.log("body", body);
  // Registration logic will be implemented here in the future
  if (!body.firstName || !body.lastName || !body.email || !body.password) {
    return res.status(400).send("All required fields must be filled.");
  }

  const user = await User.create(body);

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
};
