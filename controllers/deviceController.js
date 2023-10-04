const Device = require("../models/deviceModel");

// Create a new device
exports.addDevice = async (req, res) => {
  try {
    const { id, userId } = req.body;

    const user = await Device.create({
      id,
      UserId: userId,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllDevices = async (req, res) => {
  try {
    const devices = await Device.findAll();
    res.json(devices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
