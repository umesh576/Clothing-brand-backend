import { Router } from "express";
import {
  addRating,
  deleteRating,
  getRatings,
  getRatingsByCloth,
  updateRating,
} from "../controller/Rating.controller";

const router = Router();

// Define your routes here
router.post("/add-rating", addRating);
router.get("/get-ratings", getRatings);
router.get("/get-ratings/:clothId", getRatingsByCloth);
router.delete("/delete-rating/:ratingId", deleteRating);
router.put("/update-rating/:ratingId", updateRating);

export default router;
