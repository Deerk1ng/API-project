'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: "Users"},
        onDelete: "CASCADE"
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {

        }
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {

        }
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {

        }
      },
      lat: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {

        }
      },
      lng: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {

        }
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      previewImage: {
        type: Sequelize.INTEGER
      },
      avgRating: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Spots');
  }
};
