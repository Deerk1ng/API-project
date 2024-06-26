'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};
const data = [{
  "ownerId": 2,
  "address": "AAAAABBBBCCCC",
  "city": "San Francisco",
  "state": "California",
  "country": "United States of America",
  "lat": 22.7645358,
  "lng": -69.4730327,
  "name": "DEMO1",
  "description": "first demo spot",
  "price": 123,
  "createdAt": "2021-11-19 20:39:36",
  "updatedAt": "2021-11-19 20:39:36",
},
{
"ownerId": 3,
"address": "DDDDDEEEEEFFFF",
"city": "San Diego",
"state": "California",
"country": "United States of America",
"lat": 42.7645358,
"lng": -90.4730327,
"name": "DEMO2",
"description": "second demo spot",
"price": 456,
"createdAt": "2021-11-20 20:39:36",
"updatedAt": "2021-11-19 20:39:36",
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
    options.tableName = "Spots"
    options.validate = true
    const { Spot } = require('../models')
    await Spot.bulkCreate(data, options)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spots', data, {})
  }
};
