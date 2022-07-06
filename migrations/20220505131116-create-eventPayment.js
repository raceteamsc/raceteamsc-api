'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EventsPayments', {
      pref_id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true
      },
      order_id: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      pay_id: {
        allowNull: true,
        type: Sequelize.STRING,
      },
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
      status: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('EventsPayments');
  },
};
