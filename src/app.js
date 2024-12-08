const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("API is working!");
});

// API Routes

app.use("/api/tasks", taskRoutes);

// Error Handling
app.use(errorHandler);

module.exports = app;
