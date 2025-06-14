'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      resource: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Resource being accessed (users, pets, shelters, etc.)'
      },
      action: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Action being performed (create, read, update, delete)'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Adicionar índice composto para resource + action
    await queryInterface.addIndex('Permissions', ['resource', 'action'], {
      unique: true,
      name: 'permissions_resource_action_unique'
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Permissions');
  }
};
