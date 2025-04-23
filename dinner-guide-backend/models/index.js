const sequelize = require("../config/database");
const User = require("./User");
const Restaurant = require("./Restaurant");
const Reservation = require("./Reservation");
const Review = require("./Review");

// Thiết lập các mối quan hệ
User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

Restaurant.hasMany(Reservation, { foreignKey: 'restaurantId' });
Reservation.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
Review.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

const syncDatabase = async () => {
  try {
    // Temporarily using force: true to update the schema
    await sequelize.sync({ force: true });
    console.log("✅ Database synchronized and tables recreated");
    
    // After syncing, change this back to force: false
    // You should change this back after the first successful sync
    
  } catch (error) {
    console.error("❌ Database sync error:", error);
  }
};

module.exports = { 
  sequelize, 
  User, 
  Restaurant, 
  Reservation, 
  Review, 
  syncDatabase 
};
