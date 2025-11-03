import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      required: [true, "ClothId is required."],
      type: mongoose.Schema.Types.ObjectId,
    },
    items: [
      {
        clothId: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, "ClothId Required to make your cart."],
          ref: "clothes",
        },
        quantity: {
          type: [Number, "Quantity must be in number."],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("cart", CartSchema);
export default Cart;
