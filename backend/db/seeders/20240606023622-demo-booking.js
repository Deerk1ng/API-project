'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};
const data = [{
  "spotId": 1,
  "userId": 2,
  "startDate": "2025-11-19",
  "endDate": "2025-11-20",
},
{
  "spotId": 2,
  "userId": 3,
  "startDate": "2025-12-19",
  "endDate": "2025-12-20"
}]

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
    options.tableName = "Bookings"
    options.validate = true
    const { Booking } = require('../models')
    await Booking.bulkCreate(data, options)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', data, {})

  }
};
