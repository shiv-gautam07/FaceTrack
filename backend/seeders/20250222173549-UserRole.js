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

    //roles:
    const [adminRole] = await queryInterface.sequelize.query(
      `SELECT id FROM Roles WHERE role = 'admin'`,
      { type: Sequelize.QueryTypes.SELECT },
    );
    const [employeeRole] = await queryInterface.sequelize.query(
      `SELECT id FROM Roles WHERE role = 'employee'`,
      { type: Sequelize.QueryTypes.SELECT },
    );

    //users:

    const [user1] = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE email = 'sanya@gmail.com'`,
      { type: Sequelize.QueryTypes.SELECT },
    );
    const [user2] = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE email = 'saumya@gmail.com'`,
      { type: Sequelize.QueryTypes.SELECT },
    );

    return queryInterface.bulkInsert('UserRoles', [
      {
        userId: user1.id,
        roleId: adminRole.id,
      },
      {
        userId: user2.id,
        roleId: employeeRole.id,
      },
    ]);
  },
  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('UserRoles', null, {});
  },
};
