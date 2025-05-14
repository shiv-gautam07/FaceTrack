'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      State.hasOne(models.Country, { foreignKey: 'countryCode' });
    }
  }
  State.init(
    {
      name: DataTypes.STRING(100),
      countryCode: DataTypes.STRING(2),
      stateCode: DataTypes.STRING(30),
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'State',
    },
  );
  return State;
};
