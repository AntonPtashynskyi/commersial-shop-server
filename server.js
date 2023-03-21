const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

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

app.use(
  cors({ origin: "http://localhost:5173", credentials: true }),
  express.json(),
  cookieParser()
);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
  console.log(err.status);
  console.log(err.message);
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Internal server Error";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(PORT, () => {
  connect();
  console.log(`Server listen port ${PORT}`);
});
