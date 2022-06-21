'use strict';
module.exports = (sequelize, DataTypes) => {
  const Locals = sequelize.define(
    'Locals',
    {
      name: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      createdAt: DataTypes.DATEONLY,
      updatedAt: DataTypes.DATEONLY,
    },
    {},
  );
  return Locals;
};
