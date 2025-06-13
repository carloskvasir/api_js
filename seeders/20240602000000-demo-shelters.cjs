'use strict';

'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    const shelters = [
      {
        name: 'Abrigo Patinhas Carinhosas',
        address: 'Rua das Flores, 123 - Centro, Curitiba - PR',
        phone: '(41) 3333-1111',
        email: 'contato@patinhascarinhosas.org.br',
        description: 'Somos um abrigo dedicado ao resgate e cuidado de animais abandonados. Fundado em 2010, já ajudamos mais de 500 pets a encontrarem um novo lar. Nossa missão é promover o bem-estar animal e conscientizar sobre a posse responsável.',
        userId: 1, // Carlos Kvasir
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Casa dos Peludos',
        address: 'Av. Paulista, 456 - Bela Vista, São Paulo - SP',
        phone: '(11) 4444-2222',
        email: 'adocao@casadospeludos.com.br',
        description: 'ONG especializada no resgate de cães e gatos de rua. Oferecemos cuidados veterinários completos, castração e programas de adoção responsável. Todos os nossos animais são vacinados e vermifugados.',
        userId: 2, // Ana Silva
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lar Doce Lar Animal',
        address: 'Rua do Sol, 789 - Copacabana, Rio de Janeiro - RJ',
        phone: '(21) 5555-3333',
        email: 'info@lardocelaranimal.org',
        description: 'Refúgio para animais resgatados de situações de maus-tratos. Trabalhamos com reabilitação comportamental e física, preparando os pets para uma nova chance de serem felizes com famílias amorosas.',
        userId: 3, // João Santos
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Amigos de Quatro Patas',
        address: 'Rua da Liberdade, 321 - Savassi, Belo Horizonte - MG',
        phone: '(31) 6666-4444',
        email: 'contato@amigosquatropatas.com.br',
        description: 'Associação sem fins lucrativos focada no resgate de animais feridos e abandoados. Mantemos parcerias com clínicas veterinárias e promovemos campanhas de castração gratuita na comunidade.',
        userId: 4, // Maria Oliveira
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Refúgio Vida Animal',
        address: 'Estrada do Campo, 654 - Zona Rural, Porto Alegre - RS',
        phone: '(51) 7777-5555',
        email: 'refugio@vidaanimal.org.br',
        description: 'Santuário para animais de grande porte e pets especiais. Oferecemos cuidados especializados para animais idosos, deficientes e em recuperação. Nossa equipe inclui veterinários e terapeutas comportamentais.',
        userId: 5, // Pedro Costa
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Patas Solidárias',
        address: 'SQN 415, Bloco B - Asa Norte, Brasília - DF',
        phone: '(61) 8888-6666',
        email: 'patassolidarias@gmail.com',
        description: 'Grupo de voluntários dedicado ao resgate e adoção de animais no Distrito Federal. Realizamos feiras de adoção mensais e campanhas educativas sobre guarda responsável em escolas e comunidades.',
        userId: 6, // Luciana Ferreira
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Usar findOrCreate para evitar duplicatas  
    for (const shelterData of shelters) {
      await queryInterface.sequelize.query(
        `INSERT INTO "Shelters" (name, address, phone, email, description, "userId", "createdAt", "updatedAt") 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?) 
         ON CONFLICT (email) DO NOTHING`,
        {
          replacements: [
            shelterData.name,
            shelterData.address,
            shelterData.phone,
            shelterData.email,
            shelterData.description,
            shelterData.userId,
            shelterData.createdAt,
            shelterData.updatedAt
          ],
          type: queryInterface.sequelize.QueryTypes.INSERT
        }
      );
    }
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Shelters', null, {});
  }
};
