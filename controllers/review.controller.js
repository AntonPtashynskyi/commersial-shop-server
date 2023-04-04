const Gig = require("../models/gig.model");
const Review = require("../models/review.model");
const createError = require("../utils/createError");

const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Sellers can't create review"));

  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    star: req.body.star,
    desc: req.body.desc,
  });

  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });

    if (review) {
      return next(createError(403, "Already created review"));
    }
    // !TODO => check if user purchased the item (use Order model)

    const savedReview = await newReview.save();
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    res.status(201).send(savedReview);
  } catch (error) {
    next(error);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
};
const deleteReview = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getReviews,
  deleteReview,
};
