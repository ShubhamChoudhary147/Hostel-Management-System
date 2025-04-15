const express = require("express");
const { registerUser, loginUser, currentUser } =require("../controller/userController")
const { validateToken } = require("../middlewares/validateToken");
const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/currUser",validateToken, currentUser)

module.exports = router;