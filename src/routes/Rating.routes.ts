import { Router } from "express";
import {
  addRating,
  deleteRating,
  getAllRatings,
  getRatingsByCloth,
  updateRating,
} from "../controller/Rating.controller";

const router = Router();

// Define your routes here
router.post("/add-rating", addRating);
router.get("/getAllratings", getAllRatings);
router.get("/getRatingsByClothes/:clothId", getRatingsByCloth);
router.delete("/delete-rating/:ratingId", deleteRating);
router.put("/update-rating/:ratingId", updateRating);

export default router;
