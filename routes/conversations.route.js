const express = require("express");
const { fn } = require("../controllers/conversation.controller");

const router = express.Router();

router.get("/test", fn);

module.exports = router;
