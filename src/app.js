const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/database");
const { port } = require("./config/env");
const errorHandler = require("./middleware/errorHandler");
const routes = require("./routes");

const app = express();

connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/uploads", express.static("uploads"));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
