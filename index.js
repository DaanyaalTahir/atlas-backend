require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const deviceRouter = require("./routes/deviceRoutes");
const locationRouter = require("./routes/locationRoutes");

const app = express();
const PORT = process.env.PORT || 33570;

// Middleware
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/devices", deviceRouter);
app.use("/locations", locationRouter);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the beginning of Project Atlas =)" });
});

app.listen(parseInt(PORT, 10), () => {
  console.log(`Server started on port ${PORT}`);
});
