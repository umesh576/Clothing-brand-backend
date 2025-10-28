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

export const getAllClothes = async (req: Request, res: Response) => {
  const { query, minPrice, maxPrice } = req.query;
  const filter: any = {};
  if (query) {
    filter.$or = [
      { clothName: { $regex: query, $options: "i" } },
      { brand: { $regex: query, $options: "i" } },
      { material: { $regex: query, $options: "i" } },
      { size: { $regex: query, $options: "i" } },
    ];
  }
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }
  }
  const clothes = await Clothes.find(filter)
    .populate("categoryId")
    .populate("rating");

  if (!clothes || clothes.length === 0) {
    throw new customError("No clothes found", 404);
  }
  res.status(200).json({
    success: true,
    data: clothes,
  });
};

export const getClothById = async (req: Request, res: Response) => {
  const clothId = req.params.id;
  const cloth = await Clothes.findById(clothId)
    .populate("categoryId")
    .populate("rating");
  if (!cloth) {
    throw new customError("Cloth not found", 404);
  }

  res.status(200).json({
    success: true,
    data: cloth,
  });
};
