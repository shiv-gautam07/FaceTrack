'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.belongsToMany(models.User, {
        through: models.UserRole,
        foreignKey: 'roleId',
        otherKey: 'userId',
      });
    }
  }
  Role.init(
    {
      role: DataTypes.STRING(50),
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Role',
    },
  );

  return Role;
};
