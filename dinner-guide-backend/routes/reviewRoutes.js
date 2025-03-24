const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { authenticateToken } = require("../middleware/authMiddleware");

// Routes công khai
router.get("/restaurant/:restaurantId", reviewController.getRestaurantReviews);

// Routes yêu cầu đăng nhập
router.get("/my", authenticateToken, reviewController.getMyReviews);
router.post("/", authenticateToken, reviewController.createReview);
router.put("/:id", authenticateToken, reviewController.updateReview);
router.delete("/:id", authenticateToken, reviewController.deleteReview);

module.exports = router; 