'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Address.init(
    {
      userId: DataTypes.INTEGER,
      address1: DataTypes.STRING(100),
      address2: DataTypes.STRING(100),
      street: DataTypes.STRING(50),
      cityId: DataTypes.INTEGER,
      stateCode: DataTypes.STRING(3),
      zipcode: DataTypes.STRING(25),
      countryCode: DataTypes.STRING(2),
    },
    {
      sequelize,
      modelName: 'Address',
    },
  );
  return Address;
};
