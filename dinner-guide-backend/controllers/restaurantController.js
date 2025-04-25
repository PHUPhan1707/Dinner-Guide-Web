const Restaurant = require("../models/Restaurant");
const Review = require("../models/Review");
const User = require("../models/User");
const MenuItem = require("../models/MenuItem");

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
      where: { isActive: true },
      attributes: { exclude: ['updatedAt'] },
      include: [{
        model: MenuItem,
        attributes: ['id', 'name', 'description', 'imageUrl', 'price']
      }]
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
    
    const restaurant = await Restaurant.findByPk(id, {
      include: [
        {
          model: Review,
          attributes: ['id', 'content', 'rating', 'createdAt'],
          include: [
            {
              model: User,
              attributes: ['id', 'username']
            }
          ]
        },
        {
          model: MenuItem,
          attributes: ['id', 'name', 'description', 'imageUrl', 'price']
        }
      ]
    });
    
    if (!restaurant) {
      console.log(`Restaurant with ID ${id} not found`);
      return res.status(404).json({ message: "Restaurant not found!" });
    }
    
    console.log(`Found restaurant: ${restaurant.name}`);
    
    // Get reviews for this restaurant
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
    
    // Calculate average rating
    let averageRating = 0;
    if (reviews.length > 0) {
      const sum = reviews.reduce((total, review) => {
        console.log(`Review rating: ${review.rating}, type: ${typeof review.rating}`);
        // Ensure rating is a number
        const rating = parseInt(review.rating) || 0;
        return total + rating;
      }, 0);
      averageRating = (sum / reviews.length).toFixed(1);
      console.log(`Average rating: ${averageRating} (sum: ${sum}, count: ${reviews.length})`);
    }
    
    // Create safe response object
    const restaurantData = restaurant.toJSON();
    
    // Process reviews before returning
    const safeReviews = reviews.map(review => {
      const reviewJSON = review.toJSON();
      // Ensure photos is an array
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
      longitude,
      menu
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

    // Create menu items if provided
    if (menu && Array.isArray(menu)) {
      const menuItems = menu.map(item => ({
        ...item,
        RestaurantId: newRestaurant.id
      }));
      await MenuItem.bulkCreate(menuItems);
    }

    // Fetch the created restaurant with its menu items
    const restaurantWithMenu = await Restaurant.findByPk(newRestaurant.id, {
      include: [{
        model: MenuItem,
        attributes: ['id', 'name', 'imageUrl', 'price']
      }]
    });
    
    res.status(201).json({
      message: "Restaurant created successfully!",
      restaurant: restaurantWithMenu
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
      isActive,
      menu
    } = req.body;
    
    const restaurant = await Restaurant.findByPk(id);
    
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found!" });
    }
    
    // Update restaurant fields
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

    // Update menu items if provided
    if (menu && Array.isArray(menu)) {
      // Delete existing menu items
      await MenuItem.destroy({
        where: { RestaurantId: id }
      });

      // Create new menu items
      const menuItems = menu.map(item => ({
        ...item,
        RestaurantId: id
      }));
      await MenuItem.bulkCreate(menuItems);
    }

    // Fetch updated restaurant with menu items
    const updatedRestaurant = await Restaurant.findByPk(id, {
      include: [{
        model: MenuItem,
        attributes: ['id', 'name', 'description', 'imageUrl', 'price']
      }]
    });
    
    res.json({
      message: "Restaurant updated successfully!",
      restaurant: updatedRestaurant
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
      return res.status(404).json({ message: "Restaurant not found!" });
    }
    
    // Soft delete (set isActive = false)
    restaurant.isActive = false;
    await restaurant.save();
    
    res.json({ message: "Restaurant deleted successfully!" });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ message: "Server error!" });
  }
}; 