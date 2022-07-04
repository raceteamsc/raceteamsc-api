'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventsPayments = sequelize.define(
    'EventsPayments',
    {
      guid: DataTypes.STRING,
      member_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
      createdAt: DataTypes.DATEONLY,
      updatedAt: DataTypes.DATEONLY,
    },
    {},
  );
  EventsPayments.removeAttribute("id");
  EventsPayments.associate = function (models) {
    EventsPayments.belongsTo(models.Members, {
      foreignKey: 'member_id',
    });
    EventsPayments.belongsTo(models.Events, {
      foreignKey: 'event_id',
    });
  };
  return EventsPayments;
};
