import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  LoginUser,
  RegisterUser,
} from "../controller/User.controller";

const router = Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", getUserById); // Placeholder for delete user route

export default router;
