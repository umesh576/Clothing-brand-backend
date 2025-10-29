import { Router } from "express";
import {
  CreateClothCategory,
  DeleteClothCategoryById,
  GetAllClothCategories,
  GetClothCategoryById,
  UpdateClothCategoryById,
} from "../controller/ClothCategory.controller";

const router = Router();

router.post("/add-ClothCategory", CreateClothCategory);
router.get("/", GetAllClothCategories);
router.get("/get-ClothCategory/:id", GetClothCategoryById);
router.delete("/delete-ClothCategory/:id", DeleteClothCategoryById);
router.put("/update-ClothCategory/:id", UpdateClothCategoryById);
export default router;
