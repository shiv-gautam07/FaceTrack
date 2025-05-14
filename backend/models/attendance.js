'use strict';
const { Model } = require('sequelize');
const { ATTENDANCE_STATUSES } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attendance.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Attendance.init(
    {
      userId: DataTypes.INTEGER,
      checkInTime: DataTypes.DATE,
      checkOutTime: DataTypes.DATE,
      locationLat: DataTypes.FLOAT,
      locationLng: DataTypes.FLOAT,
      status: DataTypes.ENUM(Object.keys(ATTENDANCE_STATUSES)),
    },
    {
      sequelize,
      modelName: 'Attendance',
    },
  );
  return Attendance;
};
