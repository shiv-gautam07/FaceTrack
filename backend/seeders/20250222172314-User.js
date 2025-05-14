'use strict';

const { genPasswordHash } = require('../misc');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Sanya',
        lastName: 'Dilshad',
        email: 'sanya@gmail.com',
        gender: 'Female',
        department: 'admin',
        password: genPasswordHash('sanya#1234'),
        profilePhoto: '',
        phone: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Saumya',
        lastName: 'Jain',
        email: 'saumya@gmail.com',
        gender: 'female',
        department: 'IT',
        password: genPasswordHash('saumya#1234'),
        profilePhoto: '',
        phone: '9876543211',
        createdAt: new Date(),
        updatedAt: new Date(),
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
    return queryInterface.bulkDelete('Users', null, {});
  },
};
