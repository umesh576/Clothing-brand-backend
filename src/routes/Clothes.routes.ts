import { Router } from "express";
import { addCloth } from "../controller/Clothes.contoller";

const router = Router();

router.post("/create", addCloth);

export default router;
