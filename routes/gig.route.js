const express = require("express");
const {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} = require("../controllers/gig.controller");
const { verifyToken } = require("../middleware/jwt");

const router = express.Router();

router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id", verifyToken, getGig);
router.get("/", verifyToken, getGigs);

module.exports = router;
