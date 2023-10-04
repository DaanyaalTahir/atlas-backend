const Location = require("../models/locationModel");

exports.addLocation = async (req, res) => {
  try {
    const { deviceId, latitude, longitude } = req.body;

    const user = await Location.create({
      DeviceId: deviceId,
      latitude,
      longitude,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
