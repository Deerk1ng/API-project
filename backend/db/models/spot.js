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

      Spot.hasMany(models.Review, {foreignKey: 'spotId'})
      Spot.hasMany(models.Booking, {foreignKey: 'spotId'})


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
        msg: "Latitude is not valid"
      },
        max: {
        args: 90,
        msg: "Latitude is not valid"
      },
      }
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: {
          args: -180,
        msg: "Longitude is not valid"
      },
        max: {
        args: 180,
        msg: "Longitude is not valid"
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
          msg: "Description needs a minimum of 30 characters"
        },
        isEmpty(value){
          if(!value || value.length < 30){
            throw new Error("Description needs a minimum of 30 characters")
          }
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: {args: 1, msg: "Price per day is required"},
        isEmpty(value){
          if(!value){
            throw new Error("Price per day is required")
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
