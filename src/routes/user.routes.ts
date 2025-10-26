import { Router } from "express";
import { RegisterUser } from "../controller/User.controller";

const router = Router();

router.post("/register", RegisterUser);

export default router;
