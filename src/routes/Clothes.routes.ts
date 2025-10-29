import { Router } from "express";
import {
  addCloth,
  getAllClothes,
  getClothById,
  updateClothById,
} from "../controller/Clothes.contoller";

const router = Router();

router.post("/add-clothes", addCloth);
router.get("/", getAllClothes);
router.get("/:id", getClothById);
router.put("/:id", updateClothById);

export default router;
