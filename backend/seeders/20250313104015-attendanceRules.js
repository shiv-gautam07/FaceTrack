'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('AttendanceRules', [
      {
        gracePeriod: 15,
        lateThreshold: 30,
        leaveTypes: 'Sick Leave, Paid Leave, Unpaid Leave, Casual Leave',
        annualLeave: 20,
        enableHalfDay: false,
        autoDeductLeave: true,
        markAbsentAfter: 1,
        enableAbsentAlert: true,
        notifyAdmin: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
