'use strict';

const data = [{
  "userId": 1,
  "spotId": 1,
  "review": "Duis facilisis blandit augue at lobortis. Morbi vel eros eu neque interdum condimentum. Vestibulum dapibus gravida efficitur. Nulla vitae ligula varius, tincidunt magna non, vulputate diam. Curabitur pellentesque bibendum erat non congue. Aliquam erat volutpat. Vestibulum congue turpis non tortor tincidunt vestibulum. Donec tincidunt justo eros, a lacinia odio malesuada quis. Proin vitae magna quis justo elementum faucibus nec ut urna.",
  "stars": 5,
 },{
   "userId": 3,
   "spotId": 2,
   "review": "Duis facilisis blandit augue at lobortis. Morbi vel eros eu neque interdum condimentum. Vestibulum dapibus gravida efficitur. Nulla vitae ligula varius, tincidunt magna non, vulputate diam. Curabitur pellentesque bibendum erat non congue. Aliquam erat volutpat. Vestibulum congue turpis non tortor tincidunt vestibulum. Donec tincidunt justo eros, a lacinia odio malesuada quis. Proin vitae magna quis justo elementum faucibus nec ut urna.",
   "stars": 4,
   'createdAt': '2021-6-19 9:39:36'
  },{
    "userId": 2,
    "spotId": 2,
    "review": "Aenean nec est lectus. Aliquam erat volutpat. Nam venenatis ultricies mi. Quisque finibus libero at efficitur blandit. Vestibulum ultrices egestas leo, ut fringilla risus egestas ut. Aenean non sollicitudin ipsum. In et risus sed erat feugiat consequat ut vitae felis. Donec lacus purus, ultrices a orci at, vestibulum rhoncus massa. Proin at libero quis leo maximus dignissim. Donec quis mauris eros. Duis fringilla ut massa a faucibus. Praesent egestas enim nec accumsan lacinia. Nunc ac mollis metus. Fusce sodales metus sed arcu tempor, eget feugiat nisi fringilla.",
    "stars": 2,
    'createdAt': '2021-11-19 20:39:36'
   },{
    "userId": 1,
    "spotId": 2,
    "review": "Nullam nibh purus, ultricies et est vel, ultricies aliquet purus. Suspendisse potenti. Donec rutrum et turpis eu maximus. Vivamus sollicitudin sodales leo, nec pellentesque nibh commodo eu. Sed malesuada sem ut dolor maximus laoreet. Nulla ligula risus, fringilla sed urna a, euismod finibus tortor. Nullam rutrum ac sapien in sollicitudin. Sed eget vulputate sapien. Aenean ipsum ante, suscipit pharetra risus ac, maximus hendrerit ligula.",
    "stars": 1,
    'createdAt': '2023-6-19 20:39:36'
   },
   {
    "userId": 3,
    "spotId": 1,
    "review": "Duis facilisis blandit augue at lobortis. Morbi vel eros eu neque interdum condimentum. Vestibulum dapibus gravida efficitur. Nulla vitae ligula varius, tincidunt magna non, vulputate diam. Curabitur pellentesque bibendum erat non congue. Aliquam erat volutpat. Vestibulum congue turpis non tortor tincidunt vestibulum. Donec tincidunt justo eros, a lacinia odio malesuada quis. Proin vitae magna quis justo elementum faucibus nec ut urna.",
    "stars": 5,
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
