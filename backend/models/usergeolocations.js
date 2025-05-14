'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGeoLocations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGeoLocations.belongsTo(models.User, { foreignKey: 'userId' });
      UserGeoLocations.belongsTo(models.GeofenceLocation, {
        foreignKey: 'locationId',
      });
    }
  }
  UserGeoLocations.init(
    {
      userId: DataTypes.INTEGER,
      locationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserGeoLocations',
      timestamps: false,
    },
  );
  return UserGeoLocations;
};
