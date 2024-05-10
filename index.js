require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const deviceRouter = require("./routes/deviceRoutes");
const locationRouter = require("./routes/locationRoutes");
const actionRouter = require("./routes/actionRoutes");

const { initSSERoute } = require("./config/sseService"); // Import the SSE service
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
// Middleware
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/devices", deviceRouter);
app.use("/locations", locationRouter);
app.use("/actions", actionRouter);

initSSERoute(app);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the beginning of Project Atlas =)" });
});

app.listen(parseInt(PORT, 10), () => {
  console.log(`Server started on port ${PORT}`);
});
