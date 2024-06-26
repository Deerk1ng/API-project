'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Spot, {
        foreignKey: 'imageableId',
        constraints: false
      })
      Image.belongsTo(models.Review, {
        foreignKey: 'imageableId',
        constraints: false
      })
    }
  }
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false
  },
    preview: DataTypes.BOOLEAN,
    imageableId: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
    imageableType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['SpotImage', 'ReviewImage']],
          msg: "imageable type must be either ReviewImage or SpotImage"
       }
      }
  }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
