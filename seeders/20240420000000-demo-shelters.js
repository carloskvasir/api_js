export async function up(queryInterface) {
  await queryInterface.bulkInsert('Shelters', [
    {
      name: 'ONG Amigo Animal',
      address: 'Rua Raul Pompéia, 62 - Cidade Industrial',
      phone: '4130146996',
      email: 'contato@amigoanimal.org.br',
      description: 'Uma das maiores ONGs de proteção animal do Paraná, atendendo cerca de 800 animais.',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'AAPA - Associação Amorada Proteção aos Animais',
      address: 'Rua João Alencar Guimarães, 2985 - Santa Quitéria',
      phone: '4130151212',
      email: 'contato@aapa.org.br',
      description: 'Associação que realiza resgates e tratamentos de animais em situação de risco.',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Arca de Noé Curitiba',
      address: 'Rua Padre Agostinho, 1835 - Bigorrilho',
      phone: '4199884455',
      email: 'arcadenoecwb@gmail.com',
      description: 'Organização dedicada ao resgate e reabilitação de animais abandonados.',
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'SPAC - Sociedade Protetora dos Animais de Curitiba',
      address: 'Rua Vitório Foggiato, 600 - Orleans',
      phone: '4133352251',
      email: 'contato@spacuritiba.org.br',
      description: 'Primeira sociedade protetora dos animais do Paraná, fundada em 1982.',
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Associação Vida Animal',
      address: 'Rua Primo Lourenço Tosin, 51 - Campo Comprido',
      phone: '4199998877',
      email: 'vidaanimal@gmail.com',
      description: 'ONG que atua em Curitiba e região metropolitana com foco em castração social.',
      userId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Casa dos Anjos',
      address: 'Rua Antonio Escorsin, 1780 - São Braz',
      phone: '4198765432',
      email: 'casadosanjos@outlook.com',
      description: 'Abrigo especializado em cães e gatos idosos ou com necessidades especiais.',
      userId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Grupo Força Animal',
      address: 'Rua João Bettega, 644 - Portão',
      phone: '4133521478',
      email: 'grupo@forcaanimal.org.br',
      description: 'Dedicado ao resgate de animais em situações de emergência e maus-tratos.',
      userId: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Associação São Francisco de Assis',
      address: 'Rua Mateus Leme, 2321 - Centro Cívico',
      phone: '4132336598',
      email: 'asfa@asfa.org.br',
      description: 'Proteção animal com foco em educação e conscientização da comunidade.',
      userId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Refúgio das Patinhas',
      address: 'Rua Professor Algacyr Munhoz Mader, 2800 - CIC',
      phone: '4199887766',
      email: 'refugiodaspatinhas@gmail.com',
      description: 'Abrigo que promove feiras de adoção mensais e campanhas de castração.',
      userId: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'ONG Sementinha Animal',
      address: 'Rua Victório Viezzer, 651 - Vista Alegre',
      phone: '4198523697',
      email: 'sementinha@ongsa.org.br',
      description: 'Trabalho focado em resgate, reabilitação e adoção responsável de animais.',
      userId: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('Shelters', null, {});
}