'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventsConfirmations = sequelize.define(
    'EventsConfirmations',
    {
      member_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER,
      confirmed: DataTypes.BOOLEAN,
      checkin: DataTypes.BOOLEAN,
      paid: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATEONLY,
      updatedAt: DataTypes.DATEONLY,
    },
    {},
  );
  EventsConfirmations.associate = function (models) {
    EventsConfirmations.belongsTo(models.Members, {
      foreignKey: 'member_id',
    });
    EventsConfirmations.belongsTo(models.Events, {
      foreignKey: 'event_id',
    });
  };
  EventsConfirmations.removeAttribute("id");
  return EventsConfirmations;
};
