import { Router } from "express";
import { addRating } from "../controller/Rating.controller";

const router = Router();

// Define your routes here
router.post("/add-rating", addRating);

export default router;
