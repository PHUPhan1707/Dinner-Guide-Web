const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

// Tất cả routes đều yêu cầu xác thực

// Routes cho người dùng
router.get("/my", authenticateToken, reservationController.getMyReservations);
router.post("/", authenticateToken, reservationController.createReservation);
router.put("/:id", authenticateToken, reservationController.updateReservation);
router.delete("/:id", authenticateToken, reservationController.cancelReservation);

// Routes cho admin
router.get("/all", authenticateToken, isAdmin, reservationController.getAllReservations);

module.exports = router; 