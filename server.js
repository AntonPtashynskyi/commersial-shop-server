const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const gigRoute = require("./routes/gig.route");
const orderRoute = require("./routes/orders.route");
const conversationRoute = require("./routes/conversations.route");
const messageRoute = require("./routes/messages.route");
const reviewRoute = require("./routes/reviews.route");

const { PORT, MONGO_DB } = process.env;

const app = express();

const connect = async () => {
  try {
    await mongoose.connect(MONGO_DB);
    console.log("Connected to Mongo DB");
  } catch (error) {
    console.log(error);
  }
};

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

app.listen(PORT, () => {
  connect();
  console.log(`Server listen port ${PORT}`);
});
