'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AttendanceRules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      gracePeriod: {
        type: Sequelize.INTEGER,
      },
      lateThreshold: {
        type: Sequelize.INTEGER,
      },
      leaveTypes: {
        type: Sequelize.STRING,
      },
      annualLeave: {
        type: Sequelize.INTEGER,
      },
      enableHalfDay: {
        type: Sequelize.BOOLEAN,
      },
      autoDeductLeave: {
        type: Sequelize.BOOLEAN,
      },
      markAbsentAfter: {
        type: Sequelize.INTEGER,
      },
      enableAbsentAlert: {
        type: Sequelize.BOOLEAN,
      },
      notifyAdmin: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AttendanceRules');
  },
};
