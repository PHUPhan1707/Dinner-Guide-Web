const sequelize = require("../config/database");
const User = require("./User");
const Restaurant = require("./Restaurant");
const Reservation = require("./Reservation");
const Review = require("./Review");
const MenuItem = require("./MenuItem");

// Define relationships
Restaurant.hasMany(MenuItem, { foreignKey: 'RestaurantId', onDelete: 'CASCADE' });
MenuItem.belongsTo(Restaurant, { foreignKey: 'RestaurantId' });

Restaurant.hasMany(Review, { foreignKey: 'RestaurantId', onDelete: 'CASCADE' });
Review.belongsTo(Restaurant, { foreignKey: 'RestaurantId' });

Restaurant.hasMany(Reservation, { foreignKey: 'RestaurantId', onDelete: 'CASCADE' });
Reservation.belongsTo(Restaurant, { foreignKey: 'RestaurantId' });

User.hasMany(Review, { foreignKey: 'UserId', onDelete: 'SET NULL' });
Review.belongsTo(User, { foreignKey: 'UserId' });

User.hasMany(Reservation, { foreignKey: 'UserId', onDelete: 'SET NULL' });
Reservation.belongsTo(User, { foreignKey: 'UserId' });

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
  MenuItem,
  syncDatabase
};
