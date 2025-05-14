'use strict';
const { Model } = require('sequelize');
const { NOTIFICATION_STATUSES } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notification.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Notification.init(
    {
      userId: DataTypes.INTEGER,
      message: DataTypes.STRING,
      status: DataTypes.ENUM(Object.keys(NOTIFICATION_STATUSES)),
      isRead: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Notification',
    },
  );
  return Notification;
};
