const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Review = sequelize.define(
  "Review",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER, // 1-5
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    visitDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    photos: {
      type: DataTypes.TEXT, // Lưu URLs của ảnh dưới dạng JSON string
      allowNull: true,
      get() {
        const value = this.getDataValue('photos');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('photos', JSON.stringify(value));
      }
    }
  }
);

module.exports = Review; 