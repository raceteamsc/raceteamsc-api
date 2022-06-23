'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EventsConfirmations', {
      member_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'Members', key: 'id' },
      },
      event_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'Events', key: 'id' },
      },
      confirmed: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      checkin: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      paid: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('EventsConfirmations');
  },
};
