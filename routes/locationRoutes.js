const express = require("express");
const router = express.Router();

const locationController = require("../controllers/locationController");

// Define routes for device resource
router.post("/add", locationController.addLocation);
router.get("/:deviceId", locationController.getLocationsByDeviceId);
router.get(
  "/dated-location/:deviceId/:date",
  locationController.getLocationsByDeviceIdAndDate
);

router.get(
  "/last-location/:deviceId",
  locationController.getLastLocationByDeviceId
);
router.get(
  "/all-devices-last-location/:userId",
  locationController.getDevicesLastLocationByUserId
);

module.exports = router;
