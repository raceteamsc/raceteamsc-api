'use strict';
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define(
    'Events',
    {
      name: DataTypes.STRING,
      local_id: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      member_only: DataTypes.BOOLEAN,
      payable: DataTypes.BOOLEAN,
      pix: DataTypes.STRING,
      price: DataTypes.FLOAT,
      canceled: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATEONLY,
      updatedAt: DataTypes.DATEONLY,
    },
    {},
  );
  Events.associate = function (models) {
    Events.hasMany(models.EventsConfirmations, {
      foreignKey: 'event_id',
    });
    Events.belongsTo(models.Locals, {
      foreignKey: 'local_id',
    });
  };
  return Events;
};
