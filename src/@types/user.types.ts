import mongoose from "mongoose";

export interface IPayload {
  id: mongoose.Types.ObjectId;
  role?: string;
  email: string;
}
