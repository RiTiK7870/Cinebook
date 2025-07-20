const router = require("express").Router();
const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const { createTxn } = require("../services/phonepe");

router.post("/", async (req, res) => {
  const { movieId, showtime, seats, amount } = req.body;
  const orderId = `ORD-${Date.now()}`;
  const txn = await createTxn(amount, orderId);

  const booking = await Booking.create({
    movieId,
    showtime,
    seats,
    phonepeTxnId: txn.transactionId,
    status: txn.status,
  });

  // Mark selected seats as false
  const movie = await Movie.findById(movieId);
  const show = movie.showtimes.find((s) => s.time === showtime);
  seats.forEach((index) => (show.seats[index] = false));
  await movie.save();

  res.json({ booking, payUrl: txn.redirectUrl });
});

router.post("/callback", async (req, res) => {
  const { transactionId, status } = req.body;
  const booking = await Booking.findOne({ phonepeTxnId: transactionId });
  if (booking) {
    booking.status = status;
    await booking.save();
  }
  res.sendStatus(200);
});

module.exports = router;
