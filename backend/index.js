const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const movieRoutes = require("./routes/movies");
const bookingRoutes = require("./routes/bookings");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
