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
  },{
    "userId": 2,
    "spotId": 2,
    "review": "This was an awesome spot!",
    "stars": 2
   },{
    "userId": 1,
    "spotId": 2,
    "review": "This was an awesome spot!",
    "stars": 1
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

    await queryInterface.bulkInsert('Reviews', data, {})
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
