const express = require("express");
const { fn } = require("../controllers/message.controller");

const router = express.Router();

router.get("/test", fn);

module.exports = router;
