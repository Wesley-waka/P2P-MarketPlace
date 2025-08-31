import express from "express";
import { createReview, getReviews } from "../controllers/review.controller.js";
import Review from "../models/ReviewSchema.js";

const reviewRouter = express.Router();
// Route to create a new review
reviewRouter.post('/reviews', async (req, res) => {
  const { buyerId, sellerId, rating, reviewText } = req.body;
  try {
    const review = new Review({ buyer: buyerId, seller: sellerId, rating, reviewText });
    await review.save();

    const seller = await User.findById(sellerId);
    seller.totalRating += rating;
    seller.ratingCount += 1;
    seller.reviewsCount += 1;
    await seller.save();

    res.status(201).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
});


// Route to provide feedback on a review
reviewRouter.post('/reviews/:id/feedback', async (req, res) => {
  const { feedback } = req.body;
  try {
    const review = await Review.findById(req.params.id);
    review.feedback = feedback;
    await review.save();
    res.status(200).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
});


// Route to create a new rating
reviewRouter.post('/ratings', async (req, res) => {
  const { buyerId, sellerId, rating } = req.body;
  try {
    const review = new Review({ buyer: buyerId, seller: sellerId, rating });
    await review.save();

    const seller = await User.findById(sellerId);
    seller.totalRating += rating;
    seller.ratingCount += 1;
    await seller.save();

    res.status(201).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
});


// Route to get the average rating of a seller
reviewRouter.get('/sellers/:id/rating', async (req, res) => {
  try {
    const seller = await User.findById(req.params.id);
    const averageRating = seller.ratingCount ? (seller.totalRating / seller.ratingCount).toFixed(2) : 0;
    res.status(200).send({ averageRating });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all reviews for a seller
reviewRouter.get('/sellers/:sellerId/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ seller: req.params.sellerId })
      .populate('buyer', 'name')
      .sort('-createdAt');

    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});



export default reviewRouter;