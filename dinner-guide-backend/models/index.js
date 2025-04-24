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
    // Sync tables in correct order (parent tables first)
    await User.sync({ alter: true });
    await Restaurant.sync({ alter: true });

    // Then sync child tables
    await Promise.all([
      MenuItem.sync({ alter: true }),
      Review.sync({ alter: true }),
      Reservation.sync({ alter: true })
    ]);

    console.log("✅ Database synchronized successfully");
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
