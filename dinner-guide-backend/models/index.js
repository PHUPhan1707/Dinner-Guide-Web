const sequelize = require("../config/database");
const User = require("./User");

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("✅ Database synchronized");
  } catch (error) {
    console.error("❌ Database sync error:", error);
  }
};

module.exports = { sequelize, User, syncDatabase };
