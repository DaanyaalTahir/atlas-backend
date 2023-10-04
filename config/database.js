const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql", // or 'mysql' for MySQL
    define: {
      timestamps: false, // Disable Sequelize's automatic timestamp fields (createdAt, updatedAt)
    },
  }
);

module.exports = db;
