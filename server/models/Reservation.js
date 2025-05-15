import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  auditoriumId: {
    type: String, // You can replace with real Auditorium model later
    required: true,
  },
  date: { type: Date, required: true },
  purpose: { type: String, required: true },
});

export default mongoose.model("Reservation", reservationSchema);
