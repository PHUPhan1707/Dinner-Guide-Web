const Review = require("../models/Review");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");

// Lấy đánh giá cho một nhà hàng
exports.getRestaurantReviews = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    console.log(`Getting reviews for restaurant ID: ${restaurantId}`);
    
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      console.log(`Restaurant with ID ${restaurantId} not found`);
      return res.status(404).json({ message: "Không tìm thấy nhà hàng!" });
    }
    
    const reviews = await Review.findAll({
      where: { restaurantId },
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    console.log(`Found ${reviews.length} reviews for restaurant ${restaurant.name}`);
    
    // Xử lý reviews trước khi trả về
    const safeReviews = reviews.map(review => {
      const reviewJSON = review.toJSON();
      // Đảm bảo photos là mảng
      if (!reviewJSON.photos) reviewJSON.photos = [];
      return reviewJSON;
    });
    
    res.json(safeReviews);
  } catch (error) {
    console.error("Lỗi lấy đánh giá:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

// Đánh giá nhà hàng
exports.createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { restaurantId, rating, comment, visitDate, photos } = req.body;
    
    // Validate dữ liệu
    if (!restaurantId || !rating) {
      return res.status(400).json({ 
        message: "Thiếu thông tin bắt buộc cho đánh giá!" 
      });
    }
    
    // Kiểm tra nhà hàng tồn tại
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Không tìm thấy nhà hàng!" });
    }
    
    // Kiểm tra nếu người dùng đã đánh giá nhà hàng này chưa
    const existingReview = await Review.findOne({
      where: { userId, restaurantId }
    });
    
    if (existingReview) {
      return res.status(400).json({ 
        message: "Bạn đã đánh giá nhà hàng này. Vui lòng cập nhật đánh giá thay vì tạo mới!" 
      });
    }
    
    // Xử lý photos an toàn
    let processedPhotos = [];
    if (photos && Array.isArray(photos)) {
      processedPhotos = photos;
    }
    
    // Tạo đánh giá mới
    const newReview = await Review.create({
      userId,
      restaurantId,
      rating,
      comment: comment || "",
      visitDate: visitDate || null,
      photos: processedPhotos
    });
    
    res.status(201).json({
      message: "Đánh giá thành công!",
      review: newReview
    });
  } catch (error) {
    console.error("Lỗi tạo đánh giá:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

// Cập nhật đánh giá
exports.updateReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { rating, comment, visitDate, photos } = req.body;
    
    const review = await Review.findOne({ where: { id } });
    
    if (!review) {
      return res.status(404).json({ message: "Không tìm thấy đánh giá!" });
    }
    
    // Kiểm tra người dùng có quyền cập nhật không
    if (review.userId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: "Bạn không có quyền cập nhật đánh giá này!" 
      });
    }
    
    // Cập nhật các trường
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    if (visitDate !== undefined) review.visitDate = visitDate;
    if (photos !== undefined) review.photos = photos;
    
    await review.save();
    
    res.json({
      message: "Cập nhật đánh giá thành công!",
      review
    });
  } catch (error) {
    console.error("Lỗi cập nhật đánh giá:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

// Xóa đánh giá
exports.deleteReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    const review = await Review.findOne({ where: { id } });
    
    if (!review) {
      return res.status(404).json({ message: "Không tìm thấy đánh giá!" });
    }
    
    // Kiểm tra người dùng có quyền xóa không
    const isAdmin = req.user.role === 'admin';
    if (review.userId !== userId && !isAdmin) {
      return res.status(403).json({ 
        message: "Bạn không có quyền xóa đánh giá này!" 
      });
    }
    
    await review.destroy();
    
    res.json({ message: "Xóa đánh giá thành công!" });
  } catch (error) {
    console.error("Lỗi xóa đánh giá:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

// Lấy đánh giá của người dùng hiện tại
exports.getMyReviews = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const reviews = await Review.findAll({
      where: { userId },
      include: [
        {
          model: Restaurant,
          attributes: ['id', 'name', 'imageUrl']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json(reviews);
  } catch (error) {
    console.error("Lỗi lấy đánh giá của người dùng:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
}; 