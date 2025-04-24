const Restaurant = require("../models/Restaurant");
const Review = require("../models/Review");
const User = require("../models/User");

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
      where: { isActive: true },
      attributes: { exclude: ['updatedAt'] }
    });
    
    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

// Get restaurant details with reviews
exports.getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Getting restaurant with ID: ${id}`);
    
    const restaurant = await Restaurant.findByPk(id);
    
    if (!restaurant) {
      console.log(`Restaurant with ID ${id} not found`);
      return res.status(404).json({ message: "Không tìm thấy nhà hàng!" });
    }
    
    console.log(`Found restaurant: ${restaurant.name}`);
    
    // Lấy đánh giá cho nhà hàng này
    const reviews = await Review.findAll({
      where: { RestaurantId: id },
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    console.log(`Found ${reviews.length} reviews for restaurant`);
    
    // Tính điểm đánh giá trung bình
    let averageRating = 0;
    if (reviews.length > 0) {
      const sum = reviews.reduce((total, review) => {
        console.log(`Review rating: ${review.rating}, type: ${typeof review.rating}`);
        // Đảm bảo rating là số
        const rating = parseInt(review.rating) || 0;
        return total + rating;
      }, 0);
      averageRating = (sum / reviews.length).toFixed(1);
      console.log(`Average rating: ${averageRating} (sum: ${sum}, count: ${reviews.length})`);
    }
    
    // Tạo đối tượng response an toàn, không sử dụng spread operator
    const restaurantData = restaurant.toJSON();
    
    // Xử lý reviews trước khi trả về
    const safeReviews = reviews.map(review => {
      const reviewJSON = review.toJSON();
      // Đảm bảo photos là mảng
      if (!reviewJSON.photos) reviewJSON.photos = [];
      return reviewJSON;
    });
    
    const response = {
      ...restaurantData,
      reviews: safeReviews,
      averageRating
    };
    
    console.log(`Response prepared, returning data for ${restaurant.name}`);
    res.json(response);
  } catch (error) {
    console.error("Error fetching restaurant details:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

// [ADMIN] Create new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const {
      name,
      coverImage,
      address,
      openTime,
      closeTime,
      email,
      phone,
      description,
      cuisine,
      priceRange,
      latitude,
      longitude
    } = req.body;
    
    // Validate required fields
    if (!name || !address || !coverImage || !openTime || !closeTime || !email || !phone || !description) {
      return res.status(400).json({ 
        message: "All required fields must be provided!" 
      });
    }
    
    const newRestaurant = await Restaurant.create({
      name,
      coverImage,
      address,
      openTime,
      closeTime,
      email,
      phone,
      description,
      cuisine,
      priceRange,
      latitude,
      longitude,
      ratingCount: 0
    });
    
    res.status(201).json({
      message: "Restaurant created successfully!",
      restaurant: newRestaurant
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

// [ADMIN] Update restaurant
exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      coverImage,
      address,
      openTime,
      closeTime,
      email,
      phone,
      description,
      cuisine,
      priceRange,
      latitude,
      longitude,
      isActive
    } = req.body;
    
    const restaurant = await Restaurant.findByPk(id);
    
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found!" });
    }
    
    // Update fields
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (coverImage !== undefined) updates.coverImage = coverImage;
    if (address !== undefined) updates.address = address;
    if (openTime !== undefined) updates.openTime = openTime;
    if (closeTime !== undefined) updates.closeTime = closeTime;
    if (email !== undefined) updates.email = email;
    if (phone !== undefined) updates.phone = phone;
    if (description !== undefined) updates.description = description;
    if (cuisine !== undefined) updates.cuisine = cuisine;
    if (priceRange !== undefined) updates.priceRange = priceRange;
    if (latitude !== undefined) updates.latitude = latitude;
    if (longitude !== undefined) updates.longitude = longitude;
    if (isActive !== undefined) updates.isActive = isActive;
    
    await restaurant.update(updates);
    
    res.json({
      message: "Restaurant updated successfully!",
      restaurant
    });
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

// [ADMIN] Xóa nhà hàng (soft delete)
exports.deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    
    const restaurant = await Restaurant.findByPk(id);
    
    if (!restaurant) {
      return res.status(404).json({ message: "Không tìm thấy nhà hàng!" });
    }
    
    // Soft delete (đặt isActive = false)
    restaurant.isActive = false;
    await restaurant.save();
    
    res.json({ message: "Xóa nhà hàng thành công!" });
  } catch (error) {
    console.error("Lỗi xóa nhà hàng:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
}; 