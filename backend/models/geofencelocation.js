'use strict';
const { Model } = require('sequelize');
const { STATUS } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class GeofenceLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GeofenceLocation.belongsToMany(models.User, {
        through: models.UserGeoLocations,
        foreignKey: 'locationId',
        otherKey: 'userId',
      });

    }
  }
  GeofenceLocation.init(
    {
      locationName: DataTypes.STRING(100),
      address: DataTypes.STRING(100),
      allowedLat: DataTypes.FLOAT,
      allowedLng: DataTypes.FLOAT,
      radiusMeters: DataTypes.INTEGER,
      status: DataTypes.ENUM(Object.keys(STATUS)),
    },
    {
      sequelize,
      modelName: 'GeofenceLocation',
    },
  );
  return GeofenceLocation;
};
