'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Demo',
        lastName: 'User'
      },
      {
        email: 'user1@user.io',
        username: 'DemoUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'John',
        lastName: 'Doe'
      },
      {
        email: 'user2@user.io',
        username: 'DemoUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Jane',
        lastName: 'Smith'
      },
      {
        email: 'user3@user.io',
        username: 'DemoUser3',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: 'Max',
        lastName: 'Mustermann'
      },
      {
        email: 'user4@user.io',
        username: 'DemoUser4',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'Maria',
        lastName: 'Rossi'
      },
      {
        email: 'user5@user.io',
        username: 'DemoUser5',
        hashedPassword: bcrypt.hashSync('password6'),
        firstName: 'Ivan',
        lastName: 'Ivanov'
      },
      {
        email: 'user6@user.io',
        username: 'DemoUser6',
        hashedPassword: bcrypt.hashSync('password7'),
        firstName: 'Yamada',
        lastName: 'Hanako'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
