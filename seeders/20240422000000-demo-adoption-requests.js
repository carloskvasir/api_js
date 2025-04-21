export async function up(queryInterface) {
  await queryInterface.bulkInsert('AdoptionRequests', [
    {
      petId: 1,
      userId: 2,
      status: 'pending',
      note: 'Interested in adopting Luna, have experience with Siamese cats',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      petId: 1,
      userId: 3,
      status: 'rejected',
      note: 'Would love to give Luna a home',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      petId: 2,
      userId: 3,
      status: 'approved',
      note: 'Looking for an energetic dog for my family',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      petId: 3,
      userId: 3,
      status: 'pending',
      note: 'I would like to adopt Bella as well',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      petId: 4,
      userId: 5,
      status: 'rejected',
      note: 'Would love to give Oliver a forever home',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      petId: 4,
      userId: 6,
      status: 'pending',
      note: 'I have other Persian cats and would love to adopt Oliver',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      petId: 5,
      userId: 7,
      status: 'pending',
      note: 'I have a big yard perfect for Rocky',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      petId: 6,
      userId: 7,
      status: 'approved',
      note: 'Would love to adopt Milo',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      petId: 7,
      userId: 8,
      status: 'pending',
      note: 'Charlie would be perfect for my kids',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      petId: 7,
      userId: 9,
      status: 'pending',
      note: 'I have experience with Beagles',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      petId: 8,
      userId: 9,
      status: 'approved',
      note: 'Lucy seems perfect for my quiet home',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      petId: 10,
      userId: 2,
      status: 'pending',
      note: 'Simba would be a great companion',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('AdoptionRequests', null, {});
}
