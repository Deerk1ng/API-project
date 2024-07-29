'use strict';

const data = [{
  "url": "https://cdn.prod.website-files.com/660332e04a42ee42011d9a22/660332e04a42ee42011d9b86_Artboard%201%20copy-100.webp",
  "preview": true,
  "imageableType": 'SpotImage',
  "imageableId" : 1
},{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'ReviewImage',
  "imageableId" : 1
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 1
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 1
},{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 1
},{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 1
},{
  "url": "https://media.timeout.com/images/105777074/750/422/image.jpg",
  "preview": true,
  "imageableType": 'SpotImage',
  "imageableId" : 2
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 2
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 2
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 2
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 2
},
{
  "url": "https://media.timeout.com/images/105777074/750/422/image.jpg",
  "preview": true,
  "imageableType": 'SpotImage',
  "imageableId" : 3
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 3
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 3
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 3
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 3
},
{
  "url": "https://media.timeout.com/images/105777074/750/422/image.jpg",
  "preview": true,
  "imageableType": 'SpotImage',
  "imageableId" : 4
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 4
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 4
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 4
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 4
},
{
  "url": "https://media.timeout.com/images/105777074/750/422/image.jpg",
  "preview": true,
  "imageableType": 'SpotImage',
  "imageableId" : 5
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 5
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 5
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 5
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 5
},
{
  "url": "https://media.timeout.com/images/105777074/750/422/image.jpg",
  "preview": true,
  "imageableType": 'SpotImage',
  "imageableId" : 6
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 6
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 6
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 6
},
{
  "url": "https://southwickszoo.com/wp-content/uploads/IMG_4245-scaled.jpg",
  "preview": false,
  "imageableType": 'SpotImage',
  "imageableId" : 6
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
