const express = require("express");
const router = express.Router();
const { addAdmin, getAdmin } = require("../controller/adminController");

// Get all admins
router.get("/", getAdmin);

// Add a new admin
router.post("/", addAdmin);

module.exports = router;
