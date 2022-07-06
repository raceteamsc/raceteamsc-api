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
      local_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Locals', key: 'id' },
      },
      member_only: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      payable: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      media_url: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      pix: {
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
