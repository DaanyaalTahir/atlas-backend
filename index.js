require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 3306;

// Configure MySQL connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "fifastreet12",
//   database: "atlasdb",
// });

const connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

app.use(bodyParser.json());

// Define API endpoints for CRUD operations
app.get("/api/data", (req, res) => {
  connection.query("SELECT * FROM userinfo", (err, results) => {
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
