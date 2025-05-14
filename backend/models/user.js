'use strict';
const { Model } = require('sequelize');
const { GENDER } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role, {
        through: models.UserRole,
        foreignKey: 'userId',
        otherKey: 'roleId',
      });

      User.belongsToMany(models.GeofenceLocation, {
        through: models.UserGeoLocations,
        foreignKey: 'userId',
        otherKey: 'locationId',
      });

      User.hasMany(models.Attendance, {
        foreignKey: 'userId',
      });

      User.hasMany(models.FaceRecognitionLog, {
        foreignKey: 'userId',
      });

      User.hasMany(models.Notification, {
        foreignKey: 'userId',
      });
      User.hasMany(models.LeaveRequest, {
        foreignKey: 'userId',
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING(50),
      lastName: DataTypes.STRING(50),
      email: DataTypes.STRING(100),
      gender: DataTypes.ENUM(Object.keys(GENDER)),
      department: DataTypes.STRING(100),
      password: DataTypes.STRING,
      profilePhoto: DataTypes.STRING,
      phone: DataTypes.STRING(20),
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
