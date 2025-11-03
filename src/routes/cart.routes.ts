import { Router } from "express";
import { addCart } from "../controller/Cart.controller";

const router = Router();

router.post("/addCart", addCart);

export default router;
