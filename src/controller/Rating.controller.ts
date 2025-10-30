import { Request, Response } from "express";
import Rating from "../model/Rating.model";
import Clothes from "../model/Clothes.model";

// finalize addRating function
export const addRating = async (req: Request, res: Response) => {
  try {
    const { userId, clothId, ratingValue, review } = req.body;

    if (!userId || !clothId || !review || !ratingValue) {
      return res
        .status(400)
        .json({ message: "userId, clothId and ratingValue are required" });
    }
    if (ratingValue < 1 || ratingValue > 5) {
      return res
        .status(400)
        .json({ message: "ratingValue must be between 1 and 5" });
    }

    if (ratingValue % 1 !== 0) {
      return res
        .status(400)
        .json({ message: "ratingValue must be an integer" });
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

//pending to optimize
export const getRatings = async (req: Request, res: Response) => {
  try {
    const query = req.query;

    const filter: any = {};

    // Add filtering based on query parameters
    if (query.userId) {
      filter.userId = query.userId;
    }
    if (query.clothId) {
      filter.clothId = query.clothId;
    }
    if (query.minRating) {
      filter.ratingValue = { $gte: Number(query.minRating) };
    }
    if (query.maxRating) {
      filter.ratingValue = filter.ratingValue || {};
      filter.ratingValue.$lte = Number(query.maxRating);
    }

    const ratings = await Rating.find({ filter })
      .populate("userId", "name")
      .populate("clothId", "name");
    res.status(200).json({ message: "Ratings fetched", data: ratings });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//pending to optimize
export const getRatingsByCloth = async (req: Request, res: Response) => {
  try {
    const { clothId } = req.params;
    const ratings = await Rating.find({ clothId })
      .populate("userId", "name")
      .populate("clothId", "name");

    if (ratings.length == 0) {
      return res
        .status(404)
        .json({ message: "No ratings found for this cloth" });
    }
    res.status(200).json({ message: "Ratings fetched", data: ratings });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//finalize deleteRating function
export const deleteRating = async (req: Request, res: Response) => {
  try {
    const { ratingId } = req.params;

    const rating = await Rating.findById(ratingId);
    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    const ratedCloth = await Clothes.findById(rating.clothId);
    if (ratedCloth) {
      ratedCloth.rating = ratedCloth.rating.filter(
        (id) => id.toString() !== ratingId
      );
      await ratedCloth.save();
    }

    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    const delRating = await Rating.findByIdAndDelete(ratingId);

    if (!delRating) {
      return res.status(404).json({ message: "Rating not found" });
    }
    res.status(200).json({ message: "Rating deleted", data: rating });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//finalize updateRating function
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
