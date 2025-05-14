'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
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
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      address1: {
        type: Sequelize.STRING(100),
      },
      address2: {
        type: Sequelize.STRING(100),
      },
      street: {
        type: Sequelize.STRING(50),
      },
      cityId: {
        type: Sequelize.INTEGER,
      },
      stateCode: {
        type: Sequelize.STRING(3),
      },
      zipcode: {
        type: Sequelize.STRING(25),
      },
      countryCode: {
        type: Sequelize.STRING(2),
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Addresses');
  },
};
