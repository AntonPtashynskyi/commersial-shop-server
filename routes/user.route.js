const express = require("express");
const { fn } = require("../controllers/user.controller");

const router = express.Router();

router.get("/", fn);

module.exports = router;
