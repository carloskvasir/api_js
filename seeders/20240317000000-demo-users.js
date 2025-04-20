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
    }
  ], {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('Users', null, {});
}
