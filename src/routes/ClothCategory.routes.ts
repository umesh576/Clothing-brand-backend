import { Router } from "express";
import { CreateClothCategory } from "../controller/Clothes.contoller";

const router = Router();

router.post("/add-ClothCategory", CreateClothCategory);

export default router;
