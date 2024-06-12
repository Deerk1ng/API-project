'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Spot, {foreignKey: 'spotId'})
      Review.belongsTo(models.User, {foreignKey: 'userId'})
      Review.hasMany(models.Image, {
        foreignKey: "imageableId",
        as: "ReviewImages",
        constraints: false,
        scope: {
          imageableType: 'ReviewImage'
        }
      })
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER,
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Review text is required"
        }
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: "Stars must be an integer from 1 to 5"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
