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
    }
  }
  Booking.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: '2024-06-04'
      }
    },
    endDate: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: this.startDate,
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};