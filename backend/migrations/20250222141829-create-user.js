'use strict';

const { GENDER } = require('../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING(50),
      },
      lastName: {
        type: Sequelize.STRING(50),
      },
      email: {
        type: Sequelize.STRING(100),
      },
      gender: {
        type: Sequelize.ENUM(Object.keys(GENDER)),
      },
      department: {
        type: Sequelize.STRING(100),
      },
      password: {
        type: Sequelize.STRING,
      },
      profilePhoto: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING(20),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  },
};
