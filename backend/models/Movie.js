const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: String,
  description: String,
  poster: String,
  showtimes: [
    {
      time: String,
      seats: [Boolean], // true = available
    },
  ],
});

module.exports = mongoose.model("Movie", MovieSchema);
