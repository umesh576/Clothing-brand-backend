import mongoose from "mongoose";

const clothsSchema = new mongoose.Schema({
  id: { type: "string", required: true },
  name: { type: "string", required: true, min: 3, max: 150 },
  size: { type: "string", required: true },
  color: { type: "string", required: true },
  price: { type: "number", required: true },
  disCount: { type: "number", required: true },
  brand: { type: "string", required: true },
  material: { type: "string", required: true },
  rating: { type: "number", required: true },
  stock: { type: "number", required: true },
  description: { type: "string", required: true },
  category: { type: "string", required: true },
});

const Clothes = mongoose.model("Clothes", clothsSchema);
export default Clothes;
