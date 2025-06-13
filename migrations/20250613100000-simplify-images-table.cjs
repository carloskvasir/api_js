'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Adicionar coluna URL (se não existir)
    try {
      await queryInterface.addColumn('Images', 'url', {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'URL da imagem (externa ou local)'
      });
    } catch (error) {
      // Coluna já existe, ignorar erro
      console.log('Coluna URL já existe, continuando...');
    }

    // 2. Remover colunas desnecessárias (uma por vez para evitar erros)
    const columnsToRemove = ['filename', 'path', 'originalName', 'size', 'description', 'isMain', 'updatedAt'];
    
    for (const column of columnsToRemove) {
      try {
        await queryInterface.removeColumn('Images', column);
        console.log(`Coluna ${column} removida com sucesso`);
      } catch (error) {
        console.log(`Coluna ${column} não existe ou já foi removida: ${error.message}`);
      }
    }

    // 3. Tornar URL obrigatório
    await queryInterface.changeColumn('Images', 'url', {
      type: Sequelize.STRING,
      allowNull: false,
      comment: 'URL da imagem do pet'
    });

    console.log('Migration de simplificação da tabela Images concluída com sucesso!');
  },

  async down(queryInterface, Sequelize) {
    // Reverter: adicionar as colunas de volta
    await queryInterface.addColumn('Images', 'filename', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('Images', 'path', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('Images', 'originalName', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('Images', 'size', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
    
    await queryInterface.addColumn('Images', 'description', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('Images', 'isMain', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
    
    await queryInterface.addColumn('Images', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    });
    
    // Tornar URL opcional novamente
    await queryInterface.changeColumn('Images', 'url', {
      type: Sequelize.STRING,
      allowNull: true
    });

    console.log('Migration de simplificação da tabela Images revertida com sucesso!');
  }
};
