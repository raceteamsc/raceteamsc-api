'use strict';
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define(
    'Events',
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      local_id: DataTypes.INTEGER,
      branch_id: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      payable: DataTypes.BOOLEAN,
      media_url: DataTypes.STRING,
      price: DataTypes.FLOAT,
      canceled: DataTypes.BOOLEAN,
      sympla_link: DataTypes.STRING,
      createdAt: DataTypes.DATEONLY,
      updatedAt: DataTypes.DATEONLY,
    },
    {},
  );
  Events.associate = function (models) {
    Events.hasMany(models.EventsConfirmations, {
      foreignKey: 'event_id',
    });
    Events.belongsTo(models.Branchs, {
      foreignKey: 'branch_id'
    });
    Events.belongsTo(models.Locals, {
      foreignKey: 'local_id',
    });
  };
  return Events;
};
