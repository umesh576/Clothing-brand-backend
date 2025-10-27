import { Request, Response } from "express";
import Category from "../model/ClothCategory.model";
import customError from "../middleware/customError.middleware";

export const CreateClothCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName, luxury, description } = req.body;
    if (!categoryName) {
      return res.status(400).json({ message: "categoryName is required" });
    }

    const newCategory = new Category({ categoryName, luxury, description });

    if (!newCategory) {
      new customError("Category creation failed", 400);
    }
    res.status(201).json({ message: "Category created", data: newCategory });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
