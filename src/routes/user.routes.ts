import { Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  LoginUser,
  RegisterUser,
  UpdateUserById,
} from "../controller/User.controller";

const router = Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById); // Placeholder for delete user route
router.put("/:id", UpdateUserById); // Placeholder for update user route

export default router;
