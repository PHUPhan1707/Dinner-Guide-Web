const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const reviewController = require("../controllers/reviewController");
const { authenticateToken } = require("../middleware/authMiddleware");

// Configure multer for review images upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/reviews";
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload an image."), false);
    }
  },
});

// Routes công khai
router.get("/restaurant/:restaurantId", reviewController.getRestaurantReviews);

// Routes yêu cầu đăng nhập
router.get("/my", authenticateToken, reviewController.getMyReviews);
router.post("/", authenticateToken, reviewController.createReview);
router.put("/:id", authenticateToken, reviewController.updateReview);
router.delete("/:id", authenticateToken, reviewController.deleteReview);

// Upload review image
router.post(
  "/upload-image",
  authenticateToken,
  upload.single("image"),
  (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ message: "Không có file ảnh nào được tải lên" });
      }

      // Return URL to the uploaded image
      const imageUrl = `http://localhost:5000/uploads/reviews/${req.file.filename}`;

      res.json({
        message: "Tải lên ảnh thành công",
        imageUrl,
      });
    } catch (error) {
      console.error("Lỗi tải lên ảnh:", error);
      res.status(500).json({ message: "Lỗi khi tải lên ảnh" });
    }
  }
);

module.exports = router;
