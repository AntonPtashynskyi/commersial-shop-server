const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    gigId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      require: true,
      enum: [1, 2, 3, 4, 5],
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = model("review", reviewSchema);

module.exports = Review;
