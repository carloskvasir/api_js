'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    const users = [
      {
        name: 'Carlos Kvasir',
        email: 'carlos@kvasir.dev',
        phone: '(41) 99999-1234',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ana Silva',
        email: 'ana.silva@email.com',
        phone: '(11) 98765-4321',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'João Santos',
        email: 'joao.santos@email.com',
        phone: '(21) 91234-5678',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Maria Oliveira',
        email: 'maria.oliveira@email.com',
        phone: '(31) 92345-6789',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pedro Costa',
        email: 'pedro.costa@email.com',
        phone: '(51) 93456-7890',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Luciana Ferreira',
        email: 'luciana.ferreira@email.com',
        phone: '(61) 94567-8901',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Roberto Lima',
        email: 'roberto.lima@email.com',
        phone: '(71) 95678-9012',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Carla Mendes',
        email: 'carla.mendes@email.com',
        phone: '(81) 96789-0123',
        password: await bcrypt.hash('123456', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Usar findOrCreate para evitar duplicatas
    for (const userData of users) {
      const [user, created] = await queryInterface.sequelize.query(
        `INSERT INTO "Users" (name, email, phone, password, "createdAt", "updatedAt") 
         VALUES (?, ?, ?, ?, ?, ?) 
         ON CONFLICT (email) DO NOTHING`,
        {
          replacements: [
            userData.name,
            userData.email,
            userData.phone,
            userData.password,
            userData.createdAt,
            userData.updatedAt
          ],
          type: queryInterface.sequelize.QueryTypes.INSERT
        }
      );
    }
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
