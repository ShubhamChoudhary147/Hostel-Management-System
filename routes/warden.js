const express = require("express");
const router = express.Router();
const Warden = require("../models/warden");
const { getWarden, addWarden } = require("../controller/wardenController");

// Get all wardens
router.get("/", getWarden);

// Add a new warden
router.post("/", addWarden);

module.exports = router;
