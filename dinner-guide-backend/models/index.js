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
    // Disable foreign key checks before dropping tables
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    // Drop tables in correct order (child tables first)
    await Promise.all([
      MenuItem.drop(),
      Review.drop(),
      Reservation.drop()
    ]);

    // Then drop parent tables
    await Promise.all([
      Restaurant.drop(),
      User.drop()
    ]);

    // Re-enable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    // Create tables in correct order (parent tables first)
    await User.sync();
    await Restaurant.sync();

    // Then create child tables
    await Promise.all([
      MenuItem.sync(),
      Review.sync(),
      Reservation.sync()
    ]);

    console.log("✅ Database synchronized and tables recreated");
  } catch (error) {
    console.error("❌ Database sync error:", error);
    // Re-enable foreign key checks in case of error
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1').catch(console.error);
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
