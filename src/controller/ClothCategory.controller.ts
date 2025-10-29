import { Request, Response } from "express";
import Category from "../model/ClothCategory.model";
import customError from "../middleware/customError.middleware";

export const CreateClothCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName, luxury, description } = req.body;
    if (!categoryName) {
      return res.status(400).json({ message: "categoryName is required" });
    }

    const newCategory = await Category.create({
      categoryName,
      luxury,
      description,
    });

    if (!newCategory) {
      new customError("Category creation failed", 400);
    }
    res.status(201).json({ message: "Category created", data: newCategory });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const GetAllClothCategories = async (req: Request, res: Response) => {
  try {
    const clothes = await Category.find().populate("clothes");
    res
      .status(200)
      .json({ message: "Clothes are fetched sucessfully", data: clothes });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const GetClothCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate("clothes");
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ data: category });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const DeleteClothCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const UpdateClothCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const category = await Category.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category updated", data: category });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
