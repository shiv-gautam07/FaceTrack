'use strict';

const { ATTENDANCE_STATUSES } = require('../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Attendances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      checkInTime: {
        type: Sequelize.DATE,
      },
      checkOutTime: {
        type: Sequelize.DATE,
      },
      locationLat: {
        type: Sequelize.FLOAT,
      },
      locationLng: {
        type: Sequelize.FLOAT,
      },
      status: {
        type: Sequelize.ENUM(Object.keys(ATTENDANCE_STATUSES)),
        defaultValue: ATTENDANCE_STATUSES.NotMarked,
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
    await queryInterface.dropTable('Attendances');
  },
};
