const { DataTypes } = require("sequelize");
const db = require("../config/database"); // Import the Sequelize instance
const Device = require("./deviceModel");

const Action = db.define("Action", {
  actionType: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  value: {
    type: DataTypes.INTEGER,
  },
});

Device.hasMany(Action);
Action.belongsTo(Device);

Action.sync();

module.exports = Action;
