'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeaveRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LeaveRequest.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  LeaveRequest.init(
    {
      userId: DataTypes.INTEGER,
      leaveType: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      from: DataTypes.DATE,
      to: DataTypes.DATE,
      reason: DataTypes.STRING,
      documentUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'LeaveRequest',
    },
  );
  return LeaveRequest;
};
