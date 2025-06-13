'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tags = [
      // Tags de Saúde
      {
        name: 'Castrado',
        description: 'Pet castrado/esterilizado',
        color: '#28a745',
        category: 'health',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vacinado',
        description: 'Pet com vacinas em dia',
        color: '#17a2b8',
        category: 'health',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vermifugado',
        description: 'Pet vermifugado',
        color: '#6f42c1',
        category: 'health',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Microchipado',
        description: 'Pet com microchip de identificação',
        color: '#fd7e14',
        category: 'health',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Tags de Comportamento
      {
        name: 'Brincalhão',
        description: 'Pet ativo e brincalhão',
        color: '#ffc107',
        category: 'behavior',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Calmo',
        description: 'Pet tranquilo e calmo',
        color: '#20c997',
        category: 'behavior',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sociável',
        description: 'Pet que se dá bem com outros animais',
        color: '#007bff',
        category: 'behavior',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bom com Crianças',
        description: 'Pet adequado para famílias com crianças',
        color: '#e83e8c',
        category: 'behavior',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Protetor',
        description: 'Pet com instinto protetor',
        color: '#6c757d',
        category: 'behavior',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Tags Físicas
      {
        name: 'Pequeno Porte',
        description: 'Pet de pequeno porte (até 10kg)',
        color: '#28a745',
        category: 'physical',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Médio Porte',
        description: 'Pet de médio porte (10-25kg)',
        color: '#ffc107',
        category: 'physical',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Grande Porte',
        description: 'Pet de grande porte (acima de 25kg)',
        color: '#dc3545',
        category: 'physical',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pelo Longo',
        description: 'Pet com pelo longo',
        color: '#6f42c1',
        category: 'physical',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pelo Curto',
        description: 'Pet com pelo curto',
        color: '#17a2b8',
        category: 'physical',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Tags de Cuidados
      {
        name: 'Necessita Medicação',
        description: 'Pet que precisa de medicação regular',
        color: '#dc3545',
        category: 'care',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cuidados Especiais',
        description: 'Pet que requer cuidados especiais',
        color: '#fd7e14',
        category: 'care',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Idoso',
        description: 'Pet idoso que precisa de atenção especial',
        color: '#6c757d',
        category: 'care',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Deficiência',
        description: 'Pet com alguma deficiência física',
        color: '#e83e8c',
        category: 'care',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Outras Tags
      {
        name: 'Resgatado',
        description: 'Pet que foi resgatado da rua',
        color: '#20c997',
        category: 'other',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Adoção Urgente',
        description: 'Pet que precisa ser adotado urgentemente',
        color: '#dc3545',
        category: 'other',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Tags', tags, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
  }
};
