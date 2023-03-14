const express = require("express");
const { fn } = require("../controllers/review.controller");

const router = express.Router();

router.get("/test", fn);

module.exports = router;
