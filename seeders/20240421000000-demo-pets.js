export async function up(queryInterface) {
  await queryInterface.bulkInsert('Pets', [
    {
      name: 'Luna',
      species: 'Cat',
      breed: 'Siamese',
      age: 2,
      description: 'A friendly Siamese cat with blue eyes',
      status: 'available',
      shelterId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Max',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      description: 'Energetic and loves to play fetch',
      status: 'available',
      shelterId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Bella',
      species: 'Dog',
      breed: 'Poodle',
      age: 1,
      description: 'Small, cute, and very affectionate',
      status: 'available',
      shelterId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Oliver',
      species: 'Cat',
      breed: 'Persian',
      age: 4,
      description: 'Loves to lounge and be pampered',
      status: 'pending',
      shelterId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Rocky',
      species: 'Dog',
      breed: 'German Shepherd',
      age: 2,
      description: 'Well-trained and protective',
      status: 'available',
      shelterId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Milo',
      species: 'Cat',
      breed: 'Maine Coon',
      age: 3,
      description: 'Large and gentle giant',
      status: 'available',
      shelterId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Charlie',
      species: 'Dog',
      breed: 'Beagle',
      age: 1,
      description: 'Playful and great with kids',
      status: 'available',
      shelterId: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Lucy',
      species: 'Cat',
      breed: 'Ragdoll',
      age: 2,
      description: 'Calm and loves to cuddle',
      status: 'adopted',
      shelterId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Cooper',
      species: 'Dog',
      breed: 'Labrador',
      age: 5,
      description: 'Friendly and great with other dogs',
      status: 'available',
      shelterId: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Simba',
      species: 'Cat',
      breed: 'Orange Tabby',
      age: 1,
      description: 'Adventurous and full of energy',
      status: 'available',
      shelterId: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('Pets', null, {});
}
