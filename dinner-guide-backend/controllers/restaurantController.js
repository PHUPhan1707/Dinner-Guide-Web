const Restaurant = require("../models/Restaurant");
const Review = require("../models/Review");
const User = require("../models/User");

// Lấy danh sách nhà hàng
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
      where: { isActive: true },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.json(restaurants);
  } catch (error) {
    console.error("Lỗi lấy danh sách nhà hàng:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

// Lấy chi tiết nhà hàng kèm đánh giá
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
      where: { restaurantId: id },
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    console.log(`Found ${reviews.length} reviews for restaurant`);

    // Tính điểm đánh giá trung bình
    let averageRating = 0;
    if (reviews.length > 0) {
      const sum = reviews.reduce((total, review) => {
        console.log(
          `Review rating: ${review.rating}, type: ${typeof review.rating}`
        );
        // Đảm bảo rating là số
        const rating = parseInt(review.rating) || 0;
        return total + rating;
      }, 0);
      averageRating = (sum / reviews.length).toFixed(1);
      console.log(
        `Average rating: ${averageRating} (sum: ${sum}, count: ${reviews.length})`
      );
    }

    // Tạo đối tượng response an toàn, không sử dụng spread operator
    const restaurantData = restaurant.toJSON();

    // Xử lý reviews trước khi trả về
    const safeReviews = reviews.map((review) => {
      const reviewJSON = review.toJSON();
      // Đảm bảo photos là mảng
      if (!reviewJSON.photos) reviewJSON.photos = [];
      return reviewJSON;
    });

    const response = {
      ...restaurantData,
      reviews: safeReviews,
      averageRating,
    };

    console.log(`Response prepared, returning data for ${restaurant.name}`);
    res.json(response);
  } catch (error) {
    console.error("Lỗi lấy chi tiết nhà hàng:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

// [ADMIN] Thêm nhà hàng mới
exports.createRestaurant = async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      phone,
      openingHours,
      cuisine,
      priceRange,
      imageUrl,
      latitude,
      longitude,
    } = req.body;

    // Validate dữ liệu cơ bản
    if (!name || !address) {
      return res.status(400).json({
        message: "Tên và địa chỉ nhà hàng là bắt buộc!",
      });
    }

    const newRestaurant = await Restaurant.create({
      name,
      description,
      address,
      phone,
      openingHours,
      cuisine,
      priceRange,
      imageUrl,
      latitude,
      longitude,
    });

    res.status(201).json({
      message: "Thêm nhà hàng thành công!",
      restaurant: newRestaurant,
    });
  } catch (error) {
    console.error("Lỗi thêm nhà hàng:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

// [ADMIN] Cập nhật nhà hàng
exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      address,
      phone,
      openingHours,
      cuisine,
      priceRange,
      imageUrl,
      latitude,
      longitude,
      isActive,
    } = req.body;

    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Không tìm thấy nhà hàng!" });
    }

    // Cập nhật các trường
    if (name !== undefined) restaurant.name = name;
    if (description !== undefined) restaurant.description = description;
    if (address !== undefined) restaurant.address = address;
    if (phone !== undefined) restaurant.phone = phone;
    if (openingHours !== undefined) restaurant.openingHours = openingHours;
    if (cuisine !== undefined) restaurant.cuisine = cuisine;
    if (priceRange !== undefined) restaurant.priceRange = priceRange;
    if (imageUrl !== undefined) restaurant.imageUrl = imageUrl;
    if (latitude !== undefined) restaurant.latitude = latitude;
    if (longitude !== undefined) restaurant.longitude = longitude;
    if (isActive !== undefined) restaurant.isActive = isActive;

    await restaurant.save();

    res.json({
      message: "Cập nhật nhà hàng thành công!",
      restaurant,
    });
  } catch (error) {
    console.error("Lỗi cập nhật nhà hàng:", error);
    res.status(500).json({ message: "Lỗi server!" });
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
