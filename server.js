const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
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

app.listen(PORT, () => {
  connect();
  console.log(`Server listen port ${PORT}`);
});
