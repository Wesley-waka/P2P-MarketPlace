import Review from "../models/ReviewSchema.js";

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { reviewerId, revieweeId, rating, review } = req.body;
    const newReview = new Review({ reviewerId, revieweeId, rating, review });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews for a specific user
export const getReviews = async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ revieweeId: userId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


