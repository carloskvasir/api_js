module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PetTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      petId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Pets',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tagId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tags',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      addedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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

    // Adicionar índices compostos para melhor performance
    await queryInterface.addIndex('PetTags', ['petId', 'tagId'], {
      unique: true,
      name: 'unique_pet_tag'
    });
    await queryInterface.addIndex('PetTags', ['petId']);
    await queryInterface.addIndex('PetTags', ['tagId']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('PetTags');
  }
};
