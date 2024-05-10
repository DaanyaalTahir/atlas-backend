const Location = require("../models/locationModel");
let { clients } = require("../config/sseService");
const { QueryTypes, Op } = require("sequelize");
const db = require("../config/database");

exports.addLocation = async (req, res) => {
  try {
    const { locations } = req.body;

    for (let i = 0; i < locations.length; i++) {
      const { deviceId, latitude, longitude, date } = locations[i];

      await Location.create({
        date: new Date(date),
        DeviceId: deviceId,
        latitude,
        longitude,
      });

      if (i == locations.length - 1) {
        clients.forEach((client, userId) => {
          console.log("Sending message to ", userId);
          client.write(
            `event: ${userId}_device_location\ndata: ${JSON.stringify({
              latitude,
              longitude,
              date,
              deviceId,
            })}\n\n`
          );
        });
      }
    }

    res.status(201).json({ message: "Entries successfully added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getLocationsByDeviceId = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const locations = await Location.findAll({ where: { DeviceId: deviceId } });
    res.status(201).json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getLocationsByDeviceIdAndDate = async (req, res) => {
  try {
    const { deviceId, date } = req.params;
    console.log(date);
    // Use Sequelize's Op object to create a date range query
    const { Op } = require("sequelize");
    const dateRange = {
      [Op.gte]: new Date(date.split("T")[0]), // Greater than or equal to the given date without the time
      [Op.lt]: new Date(date.split("T")[0]).setDate(
        new Date(date.split("T")[0]).getDate() + 1
      ), // Less than the next day
    };

    // Find all the locations for the device id and the date range
    const locations = await Location.findAll({
      where: { DeviceId: deviceId, date: dateRange },
    });
    res.status(201).json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getLastLocationByDeviceId = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const lastLocation = await Location.findOne({
      where: { DeviceId: deviceId },
      order: [["date", "DESC"]],
    });

    if (lastLocation) {
      res.status(200).json(lastLocation);
    } else {
      res
        .status(404)
        .json({ message: "No location found for the given device ID" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDevicesLastLocationByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const results = await db.query(
      `
      SELECT
        l.id,
        l.Date,
        l.Latitude,
        l.Longitude,
        l.DeviceId,
        d.name,
        d.itemType,
        d.description
      FROM
        locations AS l
      JOIN
        devices AS d ON l.DeviceId = d.id
      WHERE
        d.UserId = :userId AND
        l.Date = (
          SELECT
            MAX(Date)
          FROM
            locations
          WHERE
            DeviceId = l.DeviceId
        );
    `,
      {
        replacements: { userId },
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
