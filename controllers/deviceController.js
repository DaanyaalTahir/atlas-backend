const Device = require("../models/deviceModel");

// Create a new device
exports.addDevice = async (req, res) => {
  try {
    const { id, userId, name, itemType } = req.body;

    const user = await Device.create({
      id,
      UserId: userId,
      name,
      itemType,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDevicesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const devices = await Device.findAll({ where: { UserId: userId } });

    if (devices.length === 0) {
      // No devices found for the user, return a 404 Not Found status
      return res.status(404).json({ message: "No devices found for the user" });
    }

    res.json(devices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDeviceByDeviceId = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const device = await Device.findOne({ where: { id: deviceId } });

    if (!device) {
      // Device not found, return a 404 Not Found status
      return res.status(404).json({ message: "Device not found" });
    }

    res.json(device);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateDeviceFrequency = async (req, res) => {
  try {
    const { deviceId, frequency } = req.body;

    const device = await Device.findOne({ where: { id: deviceId } });

    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }

    device.frequency = frequency;
    await device.save();

    res.status(200).json(device);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
