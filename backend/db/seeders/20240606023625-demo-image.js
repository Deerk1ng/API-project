'use strict';

const data = [{
  "url": "image url",
  "preview": true,
  "imageableType": 'SpotImage',
  "imageableId" : 1
},{
  "url": "image url 3",
  "preview": false,
  "imageableType": 'ReviewImage',
  "imageableId" : 1
},{
  "url": "image url 4",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 1
},
]
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = "Images"
    options.validate = true
    const { Image } = require('../models')
    await Image.bulkCreate(data, options)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Images', data, {})

  }
};
