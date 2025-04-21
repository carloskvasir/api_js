export async function up(queryInterface) {
  await queryInterface.bulkInsert('Users', [
    {
      name: 'Carlos Kvasir Lima',
      email: 'carlos@kvasir.dev',
      phone: '1234567890',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Octavio Ortoncelli',
      email: 'ortoncelli@dev.com',
      phone: '9876543210',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'David Dorian',
      email: 'david@dev.com',
      phone: '5555555555',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Gandalf Gustavo',
      email: 'gustavo@dev.com',
      phone: '7777777777',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Marina Santos Silva',
      email: 'marina.silva@email.com',
      phone: '11988776655',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Rafael Oliveira Costa',
      email: 'rafael.costa@email.com',
      phone: '21977665544',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Julia Pereira Santos',
      email: 'julia.pereira@email.com',
      phone: '31966554433',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Lucas Ferreira Lima',
      email: 'lucas.lima@email.com',
      phone: '41955443322',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Beatriz Almeida Rocha',
      email: 'beatriz.rocha@email.com',
      phone: '51944332211',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Gabriel Mendes Costa',
      email: 'gabriel.costa@email.com',
      phone: '61933221100',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('Users', null, {});
}
