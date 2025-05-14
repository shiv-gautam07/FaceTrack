'use strict';
const countriesData = require('../assets/countries+states+cities.json');
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
    const countries = [];
    const states = [];
    const cities = [];
    countriesData.map(country => {
      countries.push({
        name: country.name,
        countryCode: country.iso2,
        phoneCode: country.phone_code.substr(0, 15),
        nationality: '',
        latitude:
          country.latitude && !isNaN(country.latitude)
            ? parseFloat(country.latitude)
            : 0,
        longitude:
          country.longitude && !isNaN(country.longitude)
            ? parseFloat(country.longitude)
            : 0,
        emoji: country.emoji,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      country.states.map(state => {
        if (states.findIndex(item => item.stateCode == state.state_code) < 0) {
          states.push({
            name: state.name,
            countryCode: country.iso2,
            stateCode: state.state_code,
            latitude:
              state.latitude && !isNaN(state.latitude)
                ? parseFloat(state.latitude)
                : 0,
            longitude:
              state.longitude && !isNaN(state.longitude)
                ? parseFloat(state.longitude)
                : 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          state.cities.map(city => {
            cities.push({
              name: city.name,
              countryCode: country.iso2,
              stateCode: state.state_code,
              latitude:
                city.latitude && !isNaN(city.latitude)
                  ? parseFloat(city.latitude)
                  : 0,
              longitude:
                city.longitude && !isNaN(city.longitude)
                  ? parseFloat(city.longitude)
                  : 0,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
            return city;
          });
        }

        return state;
      });
      return country;
    });

    // console.log('Countries', countries, states);
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert('Countries', countries, { transaction }),
        await queryInterface.bulkInsert('States', states, { transaction }),
        await queryInterface.bulkInsert('Cities', cities, { transaction }),
        await transaction.commit();
    } catch (err) {
      console.log('Error ', err);
      await transaction.rollback();
      throw err;
    }
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
