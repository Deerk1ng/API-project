'use strict';

const data = [{
  "userId": 1,
  "spotId": 1,
  "review": "This was an awesome spot!",
  "stars": 5,
 },{
   "userId": 3,
   "spotId": 2,
   "review": "This was an awesome spot!",
   "stars": 4
  }]
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
    options.tableName = "Reviews"
    options.validate = true
    const { Review } = require('../models')
    await Review.bulkCreate(data, options)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', data, {})

  }
};
