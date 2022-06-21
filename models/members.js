'use strict';
module.exports = (sequelize, DataTypes) => {
  const Members = sequelize.define(
    'Members',
    {
      name: DataTypes.STRING,
      number: DataTypes.STRING,
      role: DataTypes.STRING,
      createdAt: DataTypes.DATEONLY,
      updatedAt: DataTypes.DATEONLY,
    },
    {},
  );
  Members.associate = function (models) {
    Members.hasMany(models.EventsConfirmations, {
      foreignKey: 'member_id',
    });
  };
  return Members;
};
