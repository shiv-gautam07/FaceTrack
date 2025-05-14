'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('States', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
      },
      countryCode: {
        type: Sequelize.STRING(2),
        allowNull: false,
        references: {
          model: 'Countries',
          key: 'countryCode',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      stateCode: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      latitude: {
        type: Sequelize.FLOAT,
      },
      longitude: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('States');
  },
};
