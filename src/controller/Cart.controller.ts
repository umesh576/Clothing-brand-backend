import { Request, Response } from "express";
import customError from "../middleware/customError.middleware";
import Cart from "../model/Cart.model";
import Clothes from "../model/Clothes.model";
// import User from "../model/User.model";

export const addCart = async (req: Request, res: Response) => {
  const { clothId, quantity, userId } = req.body;
  if (!clothId || !quantity || !userId) {
    throw new customError("ClothId and quantity is required", 400);
  }
  const newCart = await Cart.findOne(clothId);

  if (!newCart) {
    throw new customError("Cart cannot be added.", 400);
  }

  const clothes = await Clothes.findById(clothId);
  if (!clothes) {
    throw new customError("Clothes doen't exist", 400);
  }

  const existingcart = newCart.items.find((item) => {
    item.clothId.toString() == clothId;
  });

  if (existingcart) {
    existingcart.quantity += quantity;
    newCart.items.push(existingcart);
  } else {
    newCart.items.push({ clothId, quantity });
  }
  await newCart.save();
  res.status(200).json({
    message: "Cart Created Sucessfully.",
    status: "success",
    statusCode: 200,
    data: newCart,
  });
};
