'use strict';
/** @type {import('sequelize-cli').Migration} */
const { STATUS } = require('../constants');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GeofenceLocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      locationName: {
        type: Sequelize.STRING(100),
      },
      address: {
        type: Sequelize.STRING(100),
      },
      allowedLat: {
        type: Sequelize.FLOAT,
      },
      allowedLng: {
        type: Sequelize.FLOAT,
      },
      radiusMeters: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM(Object.keys(STATUS)),
        defaultValue: STATUS.Active,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('GeofenceLocations');
  },
};
