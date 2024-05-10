const { DataTypes } = require("sequelize");
const db = require("../config/database"); // Import the Sequelize instance
const User = require("./userModel");

const Device = db.define("Device", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  itemType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  frequency: {
    type: DataTypes.INTEGER,
  },
});

User.hasMany(Device);
Device.belongsTo(User);

Device.sync();

module.exports = Device;
