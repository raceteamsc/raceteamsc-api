'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      sympla_link: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      branch_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'Branchs', key: 'id' },
      },
      local_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Locals', key: 'id' },
      },
      payable: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      media_url: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      canceled: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        default: false
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('Events');
  },
};
