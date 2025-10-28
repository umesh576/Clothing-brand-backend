import mongoose from "mongoose";

const clothsSchema = new mongoose.Schema({
  clothName: {
    type: "string",
    required: true,
    min: [3, "Minimun lenght of cloth name must be 3 character."],
    max: [150, "Maximum lenght of cloth name exceeded."],
  },

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  size: { type: "string", required: [true, "Size must be required."] },
  color: [{ type: "string", required: true, trim: true }],
  price: { type: "number", required: true },
  totalPrice: { type: "number" },
  disCount: { type: "number", required: true },
  brand: {
    type: "string",
    required: true,
    min: [3, "Minimun lenght of cloth name must be 3 character."],
    max: [100, "Maximum lenght of cloth name exceeded."],
  },
  material: { type: "string", required: true },
  rating: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rating",
  },
  stock: { type: "number", required: true },
  description: {
    type: "string",
    required: true,
    min: [10, "Minimun 10 chacter need for description."],
    max: [500, "Maximun 2000 chacter are allowed."],
  },
});

const Clothes = mongoose.model("Clothes", clothsSchema);
export default Clothes;
