require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 33570;

const connection = mysql.createConnection({
  host: "s465z7sj4pwhp7fn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: " os0hrbkfsr8bdiv",
  password: "c57gyhp7h3ml6iv0",
  database: "je0zyzny9yrih8nc",
});

// const connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

app.use(bodyParser.json());

// Define API endpoints for CRUD operations
app.get("/api/data", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
// Add more endpoints for CRUD operations (POST, PUT, DELETE)...

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the beginning of Project Atlas =)" });
});

app.listen(parseInt(PORT, 10), () => {
  console.log(`Server started on port ${PORT}`);
});
