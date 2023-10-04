const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// Define routes for device resource
router.post("/register", userController.createUser);

module.exports = router;
