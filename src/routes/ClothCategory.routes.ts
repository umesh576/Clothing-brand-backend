import { Router } from "express";
import { CreateClothCategory } from "../controller/ClothCategory.controller";

const router = Router();

router.post("/add-ClothCategory", CreateClothCategory);

export default router;
