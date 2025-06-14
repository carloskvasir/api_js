'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = [
      {
        name: 'Admin',
        description: 'Administrador do sistema com acesso total a todas as funcionalidades'
      },
      {
        name: 'Shelter',
        description: 'Responsável por abrigo - pode gerenciar pets do seu abrigo e visualizar solicitações de adoção'
      },
      {
        name: 'Adopter',
        description: 'Adotante - pode visualizar pets disponíveis e fazer solicitações de adoção'
      }
    ];

    // Adicionar timestamps
    const now = new Date();
    const rolesWithTimestamps = roles.map(role => ({
      ...role,
      created_at: now,
      updated_at: now
    }));

    await queryInterface.bulkInsert('Roles', rolesWithTimestamps, {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
