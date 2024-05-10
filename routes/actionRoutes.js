const express = require("express");
const router = express.Router();

const actionController = require("../controllers/actionController");

// Define routes for device resource
router.post("/create", actionController.createAction);
router.get("/get-action/:deviceId", actionController.getLatestAction);

module.exports = router;
