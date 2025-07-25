const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  movieId: mongoose.Types.ObjectId,
  showtime: String,
  seats: [Number],
  phonepeTxnId: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", BookingSchema);
