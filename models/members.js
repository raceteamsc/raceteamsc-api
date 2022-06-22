'use strict';
module.exports = (sequelize, DataTypes) => {
  const Members = sequelize.define(
    'Members',
    {
      name: DataTypes.STRING,
      number: DataTypes.STRING,
      role: DataTypes.STRING,
      friend_id: DataTypes.INTEGER,
      createdAt: DataTypes.DATEONLY,
      updatedAt: DataTypes.DATEONLY,
    },
    {},
  );
  Members.associate = function (models) {
    Members.hasMany(models.EventsConfirmations, {
      foreignKey: 'member_id',
    });
    Members.belongsTo(models.Members, {
      foreignKey: 'friend_id'
    });
  };
  return Members;
};
