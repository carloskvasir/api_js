'use strict';



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, _Sequelize) => {
    const adoptionRequests = [
      // Pedidos para pets do Abrigo Patinhas Carinhosas
      {
        petId: 3, // Max (Golden Retriever)
        userId: 7, // Roberto Lima
        status: 'pending',
        note: 'Olá! Tenho muito interesse no Max. Tenho uma casa com quintal grande e duas crianças que adoram cachorros. Já tive pets antes e sei da responsabilidade que é cuidar de um animal. Gostaria de agendar uma visita para conhecê-lo melhor.',
        createdAt: new Date('2024-06-01'),
        updatedAt: new Date('2024-06-01')
      },
      {
        petId: 1, // Buddy (Labrador)
        userId: 8, // Carla Mendes
        status: 'approved',
        note: 'Sou apaixonada por labradores e gostaria muito de adotar o Buddy. Moro em apartamento mas tenho tempo para levá-lo para passear várias vezes ao dia. Trabalho em home office, então ele não ficaria sozinho.',
        createdAt: new Date('2024-05-28'),
        updatedAt: new Date('2024-06-02')
      },
      {
        petId: 4, // Bella (Poodle)
        userId: 6, // Luciana Ferreira
        status: 'pending',
        note: 'Tenho interesse na Bella. Moro sozinha e trabalho meio período, então teria tempo para dedicar a ela. Já tive poodles antes e sei como cuidar da raça. Posso fornecer referências veterinárias.',
        createdAt: new Date('2024-06-03'),
        updatedAt: new Date('2024-06-03')
      },

      // Pedidos para pets da Casa dos Peludos
      {
        petId: 7, // Rock (Bulldog) - já foi adotado
        userId: 5, // Pedro Costa
        status: 'approved',
        note: 'O Rock seria perfeito para minha família! Temos experiência com bulldogs e sabemos dos cuidados especiais que a raça precisa. Nossa casa é adaptada e temos veterinário de confiança.',
        createdAt: new Date('2024-05-25'),
        updatedAt: new Date('2024-05-30')
      },
      {
        petId: 5, // Thor (Pastor Alemão)
        userId: 3, // João Santos
        status: 'rejected',
        note: 'Gostaria de adotar o Thor. Moro em apartamento mas posso levá-lo para exercitar-se no parque todos os dias.',
        createdAt: new Date('2024-05-20'),
        updatedAt: new Date('2024-05-22')
      },
      {
        petId: 6, // Mimi (Persa)
        userId: 4, // Maria Oliveira
        status: 'pending',
        note: 'Tenho muito interesse na Mimi. Sou apaixonada por gatos persas e tenho experiência com os cuidados especiais que a raça precisa. Posso oferecer um lar tranquilo e muito amor.',
        createdAt: new Date('2024-06-04'),
        updatedAt: new Date('2024-06-04')
      },

      // Pedidos para pets do Lar Doce Lar Animal
      {
        petId: 10, // Mel (Cocker Spaniel)
        userId: 8, // Carla Mendes
        status: 'pending',
        note: 'Estou procurando um pet mais tranquilo e maduro. A Mel parece ser perfeita! Tenho experiência com cães e posso oferecer muito carinho e cuidados veterinários adequados.',
        createdAt: new Date('2024-06-05'),
        updatedAt: new Date('2024-06-05')
      },
      {
        petId: 8, // Princesa (Angorá)
        userId: 7, // Roberto Lima
        status: 'approved',
        note: 'Minha filha está pedindo um gatinho há meses e a Princesa seria perfeita! Temos experiência com gatos e nossa casa é segura. Podemos proporcionar muito amor e brincadeiras.',
        createdAt: new Date('2024-05-30'),
        updatedAt: new Date('2024-06-01')
      },

      // Pedidos para pets dos Amigos de Quatro Patas
      {
        petId: 11, // Simba (Maine Coon)
        userId: 2, // Ana Silva
        status: 'pending',
        note: 'O Simba é lindo! Sempre quis ter um Maine Coon. Tenho outros gatos e sei que ele se adaptaria bem. Minha casa tem bastante espaço e arranhadores adequados para gatos grandes.',
        createdAt: new Date('2024-06-06'),
        updatedAt: new Date('2024-06-06')
      },
      {
        petId: 12, // Nina (Shih Tzu)
        userId: 6, // Luciana Ferreira
        status: 'approved',
        note: 'A Nina seria a companheira perfeita! Moro em apartamento e trabalho em casa, então ela teria muita companhia. Já tive shih tzus antes e adoro a raça.',
        createdAt: new Date('2024-05-28'),
        updatedAt: new Date('2024-06-03')
      },

      // Pedidos múltiplos para alguns pets
      {
        petId: 1, // Buddy (Labrador) - segundo pedido
        userId: 5, // Pedro Costa
        status: 'rejected',
        note: 'Gostaria de adotar o Buddy para fazer companhia ao meu outro cão.',
        createdAt: new Date('2024-05-26'),
        updatedAt: new Date('2024-05-28')
      },
      {
        petId: 9, // Duke (Boxer)
        userId: 7, // Roberto Lima
        status: 'pending',
        note: 'O Duke seria ideal para nossa família ativa! Fazemos caminhadas e corridas regularmente. Temos quintal grande e experiência com cães de porte médio.',
        createdAt: new Date('2024-06-07'),
        updatedAt: new Date('2024-06-07')
      }
    ];

    await queryInterface.bulkInsert('AdoptionRequests', adoptionRequests, {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('AdoptionRequests', null, {});
  }
};
