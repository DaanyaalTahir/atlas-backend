const express = require("express");
const router = express.Router();

const locationController = require("../controllers/locationController");

// Define routes for device resource
router.post("/add", locationController.addLocation);

module.exports = router;
