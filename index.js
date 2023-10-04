const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.SERVER_PORT || 33570;

// Middleware
app.use(bodyParser.json());

app.get("/api/data", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the beginning of Project Atlas =)" });
});

app.listen(parseInt(PORT, 10), () => {
  console.log(`Server started on port ${PORT}`);
});
