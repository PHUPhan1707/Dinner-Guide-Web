const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Add this line
    dialect: "mysql",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("✅ Kết nối MySQL thành công!"))
  .catch((err) => console.error("❌ Lỗi kết nối MySQL:", err));
  sequelize
  .sync({ alter: true }) // Tự động cập nhật bảng khi có thay đổi model
  .then(() => console.log("✅ Cơ sở dữ liệu đã được đồng bộ!"))
  .catch((err) => console.error("❌ Lỗi đồng bộ cơ sở dữ liệu:", err));

module.exports = sequelize;
