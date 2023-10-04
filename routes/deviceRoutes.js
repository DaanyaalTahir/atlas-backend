const express = require("express");
const router = express.Router();

const deviceController = require("../controllers/deviceController");

// Define routes for device resource
router.post("/add", deviceController.addDevice);

module.exports = router;
