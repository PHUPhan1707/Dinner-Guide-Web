const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Review = sequelize.define(
  "Review",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    RestaurantId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    photos: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []}

  },
  {
    timestamps: true
  }
);

module.exports = Review; 