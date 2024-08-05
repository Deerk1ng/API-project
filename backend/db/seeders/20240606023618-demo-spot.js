'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};
const data = [{
  "ownerId": 2,
  "address": "111 test",
  "city": "San Francisco",
  "state": "California",
  "country": "United States of America",
  "lat": 22.7645358,
  "lng": -69.4730327,
  "name": "Demo Spot 1",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat ornare ex, fermentum blandit lectus commodo convallis. Sed vel condimentum nunc, sed euismod nunc. Sed feugiat orci vel iaculis gravida. Nulla vel gravida quam. Suspendisse pulvinar egestas libero a pellentesque. Duis sit amet sem vitae massa consequat dictum vel non eros. Nulla id mi massa. Nunc vehicula nisl et cursus posuere. Pellentesque nec porttitor purus. Pellentesque venenatis tristique semper. ",
  "price": 123,
  "createdAt": "2021-11-19 20:39:36",
  "updatedAt": "2021-11-19 20:39:36",
},
{
"ownerId": 3,
"address": "222 test",
"city": "San Diego",
"state": "California",
"country": "United States of America",
"lat": 42.7645358,
"lng": -90.4730327,
"name": "Demo Spot 2",
"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat ornare ex, fermentum blandit lectus commodo convallis. Sed vel condimentum nunc, sed euismod nunc. Sed feugiat orci vel iaculis gravida. Nulla vel gravida quam. Suspendisse pulvinar egestas libero a pellentesque. Duis sit amet sem vitae massa consequat dictum vel non eros. Nulla id mi massa. Nunc vehicula nisl et cursus posuere. Pellentesque nec porttitor purus. Pellentesque venenatis tristique semper.",
"price": 456,
"createdAt": "2021-11-20 20:39:36",
"updatedAt": "2021-11-19 20:39:36",
},
{
  "ownerId": 2,
"address": "333 test",
"city": "Sacramento",
"state": "California",
"country": "United States of America",
"lat": 42.7645358,
"lng": -95.4730327,
"name": "Demo Spot 3",
"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat ornare ex, fermentum blandit lectus commodo convallis. Sed vel condimentum nunc, sed euismod nunc. Sed feugiat orci vel iaculis gravida. Nulla vel gravida quam. Suspendisse pulvinar egestas libero a pellentesque. Duis sit amet sem vitae massa consequat dictum vel non eros. Nulla id mi massa. Nunc vehicula nisl et cursus posuere. Pellentesque nec porttitor purus. Pellentesque venenatis tristique semper.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat ornare ex, fermentum blandit lectus commodo convallis. Sed vel condimentum nunc, sed euismod nunc. Sed feugiat orci vel iaculis gravida. Nulla vel gravida quam. Suspendisse pulvinar egestas libero a pellentesque. Duis sit amet sem vitae massa consequat dictum vel non eros. Nulla id mi massa. Nunc vehicula nisl et cursus posuere. Pellentesque nec porttitor purus. Pellentesque venenatis tristique semper.",
"price": 456,
"createdAt": "2021-11-20 20:39:36",
"updatedAt": "2021-11-19 20:39:36",
},
{
  "ownerId": 2,
  "address": "444 test",
  "city": "Los Angeles",
  "state": "California",
  "country": "United States of America",
  "lat": 22.7645358,
  "lng": -90.4730327,
  "name": "Demo Spot 4",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat ornare ex, fermentum blandit lectus commodo convallis. Sed vel condimentum nunc, sed euismod nunc. Sed feugiat orci vel iaculis gravida. Nulla vel gravida quam. Suspendisse pulvinar egestas libero a pellentesque. Duis sit amet sem vitae massa consequat dictum vel non eros. Nulla id mi massa. Nunc vehicula nisl et cursus posuere. Pellentesque nec porttitor purus. Pellentesque venenatis tristique semper.",
  "price": 456,
  "createdAt": "2021-11-20 20:39:36",
  "updatedAt": "2021-11-19 20:39:36",
  },
  {
    "ownerId": 2,
    "address": "555 test",
    "city": "Lancaster",
    "state": "California",
    "country": "United States of America",
    "lat": 32.7645358,
    "lng": -80.4730327,
    "name": "Demo Spot 5",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat ornare ex, fermentum blandit lectus commodo convallis. Sed vel condimentum nunc, sed euismod nunc. Sed feugiat orci vel iaculis gravida. Nulla vel gravida quam. Suspendisse pulvinar egestas libero a pellentesque. Duis sit amet sem vitae massa consequat dictum vel non eros. Nulla id mi massa. Nunc vehicula nisl et cursus posuere. Pellentesque nec porttitor purus. Pellentesque venenatis tristique semper.",
    "price": 306,
    "createdAt": "2021-11-20 20:39:36",
    "updatedAt": "2021-11-19 20:39:36",
    },
    {
      "ownerId": 1,
      "address": "666 test",
      "city": "Burbank",
      "state": "California",
      "country": "United States of America",
      "lat": 42.7645358,
      "lng": -90.4730327,
      "name": "Demo Spot 6",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat ornare ex, fermentum blandit lectus commodo convallis. Sed vel condimentum nunc, sed euismod nunc. Sed feugiat orci vel iaculis gravida. Nulla vel gravida quam. Suspendisse pulvinar egestas libero a pellentesque. Duis sit amet sem vitae massa consequat dictum vel non eros. Nulla id mi massa. Nunc vehicula nisl et cursus posuere. Pellentesque nec porttitor purus. Pellentesque venenatis tristique semper.",
      "price": 756,
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
