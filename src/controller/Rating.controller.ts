import { Request, Response } from "express";
import Rating from "../model/Rating.model";
import Clothes from "../model/Clothes.model";

export const addRating = async (req: Request, res: Response) => {
  try {
    const { userId, clothId, ratingValue, review } = req.body;

    if (!userId || !clothId || review || ratingValue < 1 || ratingValue > 5) {
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

export const getRatings = async (req: Request, res: Response) => {
  try {
    const ratings = await Rating.find()
      .populate("userId", "name")
      .populate("clothId", "name");
    res.status(200).json({ message: "Ratings fetched", data: ratings });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getRatingsByCloth = async (req: Request, res: Response) => {
  try {
    const { clothId } = req.params;
    const ratings = await Rating.find({ clothId })
      .populate("userId", "name")
      .populate("clothId", "name");
    res.status(200).json({ message: "Ratings fetched", data: ratings });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getRatingsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const ratings = await Rating.find({ userId })
      .populate("userId", "name")
      .populate("clothId", "name");
    res.status(200).json({ message: "Ratings fetched", data: ratings });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteRating = async (req: Request, res: Response) => {
  try {
    const { ratingId } = req.params;
    const rating = await Rating.findByIdAndDelete(ratingId);

    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }
    res.status(200).json({ message: "Rating deleted", data: rating });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateRating = async (req: Request, res: Response) => {
  try {
    const { ratingId } = req.params;
    const { ratingValue, review } = req.body;
    const rating = await Rating.findByIdAndUpdate(
      ratingId,
      { ratingValue, review },
      { new: true }
    );
    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }
    res.status(200).json({ message: "Rating updated", data: rating });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
