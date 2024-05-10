const express = require("express");
const router = express.Router();

const deviceController = require("../controllers/deviceController");

// Define routes for device resource
router.post("/add", deviceController.addDevice);
router.post("/update-frequency", deviceController.updateDeviceFrequency);
router.get("/user/:userId", deviceController.getDevicesByUserId);
router.get("/device/:deviceId", deviceController.getDeviceByDeviceId);

module.exports = router;
