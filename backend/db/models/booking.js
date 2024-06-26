'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Spot, {foreignKey: 'spotId'})
      Booking.belongsTo(models.User, {foreignKey: 'userId'})

    }
  }
  Booking.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: {
      type: DataTypes.DATE,
      validate: {
        isAfter(value){
          if(value < Date.now()) {
            throw new Error("startDate cannot be in the past")
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      validate: {
        isAfter(value){
          if(value <= this.startDate) {
            throw new Error("endDate cannot be on or before startDate")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
