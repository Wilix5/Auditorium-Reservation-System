import express from "express";
import Reservation from "../models/Reservation.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Reservation
router.post("/", verifyToken, async (req, res) => {
  try {
    const { auditoriumId, date, purpose } = req.body;
    console.log("Saving reservation for:", req.user.id);

    const reservation = new Reservation({
      userId: req.user.id, // ✅ pulled from token
      auditoriumId,
      date,
      purpose,
    });

    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ message: "Reservation failed", error: err.message });
  }
});


// Get All Reservations (Admin use)
router.get("/", verifyToken, async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("userId", "name email");
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reservations" });
  }
});

// Get Reservations for Logged-in User
router.get("/user", verifyToken, async (req, res) => {
  try {
    console.log("Fetching reservations for user:", req.user.id);  // 👈 ADD THIS
    const reservations = await Reservation.find({ userId: req.user.id });
    console.log("Found reservations:", reservations);              // 👈 ADD THIS
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user reservations" });
  }
});

// DELETE a reservation
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: "Not found" });

    if (reservation.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await reservation.deleteOne();
    res.json({ message: "Reservation deleted" });
  } catch (err) {
    res.status(500).json({ message: "Deletion failed", error: err.message });
  }
});

// Update reservation
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: "Not found" });

    if (reservation.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    reservation.date = req.body.date || reservation.date;
    reservation.purpose = req.body.purpose || reservation.purpose;

    await reservation.save();
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});



export default router;