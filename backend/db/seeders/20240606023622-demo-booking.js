'use strict';
const data = [{
  "spotId": 1,
  "userId": 2,
  "startDate": "2021-11-19",
  "endDate": "2021-11-20",
},{
"spotId": 2,
"userId": 3,
"startDate": "2021-12-19",
"endDate": "2021-12-20"
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

     await queryInterface.bulkInsert('Bookings', data, {})
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
