'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey: 'ownerId'})
      Spot.belongsToMany(models.User, {
        through: models.Booking,
        foreignKey: 'spotId',
        otherKey: 'userId'
      })
      Spot.hasMany(models.Review, {foreignKey: 'spotId'})


      Spot.hasMany(models.Image, {
        foreignKey: "imageableId",
        constraints: false,
        scope: {
          imageableType: 'SpotImage'
        }
      })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Street address is required"
        },
        isEmpty(value){
          if(!value){
            throw new Error("Street address is required")
          }
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "City is required"
        },
        isEmpty(value){
          if(!value){
            throw new Error("City is required")
          }
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "State is required"
        },
        isEmpty(value){
          if(!value){
            throw new Error("State is required")
          }
        }
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Country is required"
        },
        isEmpty(value){
          if(!value){
            throw new Error("Country is required")
          }
        }
      }
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: {
          args: -90,
        msg: "Latitude must be within -90 and 90"
      },
        max: {
        args: 90,
        msg: "Latitude must be within -90 and 90"
      },
      }
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: {
          args: -180,
        msg: "Longitude must be within -180 and 180"
      },
        max: {
        args: 180,
        msg: "Longitude must be within -180 and 180"
      },
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {args:[4, 50], msg: "Name must be less than 50 characters"}
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description is required"
        },
        isEmpty(value){
          if(!value){
            throw new Error("Description is required")
          }
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: {args: 1, msg: "Price per day must be a positive number"}
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
