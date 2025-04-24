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
    // Using alter: true to update schema without dropping tables
    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized and schema updated");
    
    
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
