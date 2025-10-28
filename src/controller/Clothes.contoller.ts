import { Request, Response } from "express";
import customError from "../middleware/customError.middleware";
import Clothes from "../model/Clothes.model";

export const addCloth = async (req: Request, res: Response) => {
  const clothData = req.body;

  if (
    !clothData.clothName ||
    !clothData.size ||
    !clothData.color ||
    !clothData.price ||
    !clothData.disCount ||
    !clothData.brand ||
    !clothData.material ||
    !clothData.rating ||
    !clothData.stock ||
    !clothData.description ||
    !clothData.categoryId
  ) {
    throw new customError("All fields are required", 400);
  }

  const newCloth = await Clothes.create(clothData);

  if (!newCloth) {
    throw new customError("Failed to create cloth", 500);
  }

  res.status(201).json({
    success: true,
    message: "Cloth created successfully",
    data: newCloth,
  });
};
