const { DataTypes } = require("sequelize");
const db = require("../config/database"); // Import the Sequelize instance
const Device = require("./deviceModel");

const Location = db.define("Location", {
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Device.hasMany(Location);
Location.belongsTo(Device);

Location.sync();

module.exports = Location;
