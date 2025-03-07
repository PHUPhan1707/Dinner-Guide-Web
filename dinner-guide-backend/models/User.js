const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Đảm bảo email hợp lệ
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
    scopes: {
      withPassword: { attributes: { include: ["password"] } }, // Lấy password khi cần
    },
  }
);

// So sánh mật khẩu khi login
User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Ẩn mật khẩu khi trả về JSON
User.prototype.toJSON = function () {
  let values = { ...this.get() };
  delete values.password;
  return values;
};

module.exports = User;
