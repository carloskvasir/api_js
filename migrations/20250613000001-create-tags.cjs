module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tags', {
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
      color: {
        type: Sequelize.STRING(7), // Para códigos hex de cores (#FF5733)
        allowNull: true,
        defaultValue: '#007bff'
      },
      category: {
        type: Sequelize.ENUM('health', 'behavior', 'physical', 'care', 'other'),
        allowNull: false,
        defaultValue: 'other'
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Adicionar índices para melhor performance
    await queryInterface.addIndex('Tags', ['name']);
    await queryInterface.addIndex('Tags', ['category']);
    await queryInterface.addIndex('Tags', ['isActive']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Tags');
  }
};
