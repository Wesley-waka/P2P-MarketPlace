import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    reviewText: { type: String, required: true },
    feedback: { type: String }
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;