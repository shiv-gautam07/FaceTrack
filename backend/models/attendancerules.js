'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AttendanceRules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AttendanceRules.init(
    {
      gracePeriod: DataTypes.INTEGER,
      lateThreshold: DataTypes.INTEGER,
      leaveTypes: DataTypes.STRING,
      annualLeave: DataTypes.INTEGER,
      enableHalfDay: DataTypes.BOOLEAN,
      autoDeductLeave: DataTypes.BOOLEAN,
      markAbsentAfter: DataTypes.INTEGER,
      enableAbsentAlert: DataTypes.BOOLEAN,
      notifyAdmin: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'AttendanceRules',
      timestamps: false,
    },
  );
  return AttendanceRules;
};
