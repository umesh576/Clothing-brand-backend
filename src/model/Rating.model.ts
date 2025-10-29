import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clothId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clothes",
      required: true,
    },
    ratingValue: {
      type: "number",
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: "string",
      max: [500, "Maximum lenght of review exceeded."],
    },
  },
  { timestamps: true }
);
const Rating = mongoose.model("rating", ratingSchema);
export default Rating;
