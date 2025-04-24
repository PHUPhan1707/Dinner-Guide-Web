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
      type: DataTypes.TEXT, // Store photo URLs as JSON string
      allowNull: true,
      defaultValue: "[]",
      get() {
        const value = this.getDataValue('photos');
        if (!value) return [];
        try {
          return JSON.parse(value);
        } catch (error) {
          console.error("Error parsing JSON photos:", error);
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
            console.error("Error stringifying photos:", error);
            this.setDataValue('photos', "[]");
          }
        }
      }
    }
  },
  {
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
    },
    timestamps: true
  }
);

module.exports = Review; 