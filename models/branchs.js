'use strict';
module.exports = (sequelize, DataTypes) => {
  const Branchs = sequelize.define(
    'Branchs',
    {
      name: DataTypes.STRING,
      createdAt: DataTypes.DATEONLY,
      updatedAt: DataTypes.DATEONLY,
    },
    {},
  );
  Branchs.associate = function (models) {
    Branchs.hasMany(models.Events, {
      foreignKey: 'id',
    });
    Branchs.hasMany(models.Members, {
      foreignKey: 'id',
    });
  };
  return Branchs;
};
