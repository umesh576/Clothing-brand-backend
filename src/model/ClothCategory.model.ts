import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
    },
    luxury: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model("Category", CategorySchema);
export default Category;
