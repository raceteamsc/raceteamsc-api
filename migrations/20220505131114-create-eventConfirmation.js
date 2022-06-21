'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EventsConfirmations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      member_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Members', key: 'id' },
      },
      event_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Events', key: 'id' },
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
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
