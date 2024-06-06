'use strict';

const data = [{
  "url": "image url",
  "preview": true,
  "imageableType": 'PreviewImage',
  "imageableId" : 1
},{
  "url": "image url 3",
  "preview": false,
  "imageableType": 'ReviewImage',
  "imageableId" : 1
},
]
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

     await queryInterface.bulkInsert('Images', data, {})
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