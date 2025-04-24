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
      defaultValue: ""
    },
    visitDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    photos: {
      type: DataTypes.TEXT, // Lưu URLs của ảnh dưới dạng JSON string
      allowNull: true,
      defaultValue: "[]",
      get() {
        const value = this.getDataValue('photos');
        if (!value) return [];
        try {
          return JSON.parse(value);
        } catch (error) {
          console.error("Lỗi parse JSON photos:", error);
          return [];
        }
      },
      set(value) {
        if (!value) {
          this.setDataValue('photos', "[]");
        } else {
          try {
            this.setDataValue('photos', JSON.stringify(value));
          } catch (error) {
            console.error("Lỗi stringify photos:", error);
            this.setDataValue('photos', "[]");
          }
        }
      }
    }
  },
  {
    // Thêm hook toJSON để đảm bảo photos luôn là mảng
    hooks: {
      afterFind: (result) => {
        if (!result) return result;
        
        if (Array.isArray(result)) {
          result.forEach(instance => {
            if (instance.photos === null || instance.photos === undefined) {
              instance.photos = [];
            }
          });
        } else if (result.photos === null || result.photos === undefined) {
          result.photos = [];
        }
        return result;
      }
    }
  }
);

module.exports = Review; 