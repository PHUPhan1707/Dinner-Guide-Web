const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

// Routes công khai (không cần đăng nhập)
router.get("/", restaurantController.getAllRestaurants);
router.get("/:id", restaurantController.getRestaurantById);

// Routes yêu cầu quyền Admin
router.post("/", authenticateToken, isAdmin, restaurantController.createRestaurant);
router.put("/:id", authenticateToken, isAdmin, restaurantController.updateRestaurant);
router.delete("/:id", authenticateToken, isAdmin, restaurantController.deleteRestaurant);

module.exports = router; 