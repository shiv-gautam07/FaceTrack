const { MESSAGES } = require('../constants');
const db = require('../models');

class MiscController {
  static async checkIfNotExistRole(id) {
    const existingRoleId = await db.Role.findByPk(id);
    if (!existingRoleId) {
      throw new Error(MESSAGES.roleIdDoesntExist);
    }
  }
  static async checkIfNotExistCityId(id) {
    const existingCityId = await db.City.findByPk(id);
    if (!existingCityId) {
      throw new Error(MESSAGES.cityIdDoesntExist);
    }
  }
  static async checkIfNotExistStateCode(stateCode) {
    const existingStateCode = await db.State.findOne({
      where: { stateCode: stateCode },
    });
    if (!existingStateCode) {
      throw new Error(MESSAGES.stateCodeDoesntExist);
    }
  }
  static async checkIfNotExistCountryCode(countryCode) {
    const existingCountryCode = await db.Country.findOne({
      where: { countryCode: countryCode },
    });
    if (!existingCountryCode) {
      throw new Error(MESSAGES.countryCodeDoesntExist);
    }
  }
}

module.exports = MiscController;
