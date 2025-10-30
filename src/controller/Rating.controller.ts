import { Request, Response } from "express";
import Rating from "../model/Rating.model";
import Clothes from "../model/Clothes.model";

export const addRating = async (req: Request, res: Response) => {
  try {
    const { userId, clothId, ratingValue, review } = req.body;

    if (!userId || !clothId || !ratingValue) {
      return res
        .status(400)
        .json({ message: "userId, clothId and ratingValue are required" });
    }

    const cloth = await Clothes.findById(clothId);
    if (!cloth) {
      return res.status(404).json({ message: "Cloth not found" });
    }

    const rating = await Rating.create({
      userId,
      clothId,
      ratingValue,
      review,
    });

    cloth.rating.push(rating._id);
    await cloth.save();

    if (!rating) {
      return res.status(400).json({ message: "Failed to add rating" });
    }
    res.status(201).json({ message: "Rating added", data: rating });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
