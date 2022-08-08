'use strict';
module.exports = (sequelize, DataTypes) => {
  const Locals = sequelize.define(
    'Locals',
    {
      name: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      branch_id: DataTypes.INTEGER,
      createdAt: DataTypes.DATEONLY,
      updatedAt: DataTypes.DATEONLY,
    },
    {},
  );
  Locals.associate = function (models) {
    Locals.belongsTo(models.Branchs, {
      foreignKey: 'branch_id'
    });
  };
  return Locals;
};
