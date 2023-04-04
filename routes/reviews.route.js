const express = require("express");
const { fn } = require("../controllers/review.controller");
const { verifyToken } = require("../middleware/jwt");
const {
  createReview,
  getReviews,
  deleteReview,
} = require("../controllers/review.controller");

const router = express.Router();

router.post("/", verifyToken, createReview);
router.get("/:gigId", getReviews);
router.delete("/:reviewId", deleteReview);

module.exports = router;
