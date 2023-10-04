const { DataTypes } = require("sequelize");
const db = require("../config/database"); // Import the Sequelize instance

const User = db.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync();

module.exports = User;
