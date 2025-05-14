'use strict';

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

    // Fetching locations
    const [location1] = await queryInterface.sequelize.query(
      `SELECT id FROM GeofenceLocations WHERE locationName = 'Apple Park'`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const [location2] = await queryInterface.sequelize.query(
      `SELECT id FROM GeofenceLocations WHERE locationName = 'Apple Park'`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Fetching users
    const [user1] = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE email = 'sanya@gmail.com'`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const [user2] = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE email = 'saumya@gmail.com'`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!user1 || !user2 || !location1 || !location2) {
      console.log('Some users or locations not found, skipping seeding.');
      return;
    }

    await queryInterface.bulkInsert('UserGeoLocations', [
      { userId: user1.id, locationId: location1.id, createdAt: new Date(), updatedAt: new Date() },
      { userId: user2.id, locationId: location2.id, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('UserGeoLocations', null, {});
  }
};
