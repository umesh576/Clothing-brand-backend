import { Router } from "express";
import {
  addCloth,
  getAllClothes,
  getClothById,
} from "../controller/Clothes.contoller";

const router = Router();

router.post("/add-clothes", addCloth);
router.get("/", getAllClothes);
router.get("/:id", getClothById);

export default router;
