'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Primeiro, vamos buscar os IDs das tags e pets existentes
    const [tags] = await queryInterface.sequelize.query('SELECT id, name FROM "Tags"');
    const [pets] = await queryInterface.sequelize.query('SELECT id, name, species FROM "Pets"');

    // Criar um mapeamento de nomes para IDs
    const tagMap = tags.reduce((map, tag) => {
      map[tag.name] = tag.id;
      return map;
    }, {});

    const petTags = [
      // Buddy (Labrador) - ID 1
      { petId: 1, tagId: tagMap['Castrado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 1, tagId: tagMap['Vacinado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 1, tagId: tagMap['Brincalhão'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 1, tagId: tagMap['Bom com Crianças'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 1, tagId: tagMap['Grande Porte'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },

      // Luna (Persian Cat) - ID 2
      { petId: 2, tagId: tagMap['Castrado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 2, tagId: tagMap['Vacinado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 2, tagId: tagMap['Calmo'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 2, tagId: tagMap['Pelo Longo'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 2, tagId: tagMap['Pequeno Porte'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },

      // Max (Golden Retriever) - ID 3
      { petId: 3, tagId: tagMap['Castrado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 3, tagId: tagMap['Vacinado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 3, tagId: tagMap['Vermifugado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 3, tagId: tagMap['Sociável'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 3, tagId: tagMap['Bom com Crianças'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 3, tagId: tagMap['Grande Porte'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },

      // Mia (Siamese Cat) - ID 4
      { petId: 4, tagId: tagMap['Vacinado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 4, tagId: tagMap['Brincalhão'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 4, tagId: tagMap['Pequeno Porte'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 4, tagId: tagMap['Pelo Curto'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },

      // Charlie (Beagle) - ID 5
      { petId: 5, tagId: tagMap['Castrado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 5, tagId: tagMap['Vacinado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 5, tagId: tagMap['Brincalhão'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 5, tagId: tagMap['Médio Porte'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 5, tagId: tagMap['Bom com Crianças'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },

      // Bella (Maine Coon) - ID 6
      { petId: 6, tagId: tagMap['Castrado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 6, tagId: tagMap['Vacinado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 6, tagId: tagMap['Calmo'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 6, tagId: tagMap['Pelo Longo'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 6, tagId: tagMap['Médio Porte'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },

      // Rocky (German Shepherd) - ID 7
      { petId: 7, tagId: tagMap['Castrado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 7, tagId: tagMap['Vacinado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 7, tagId: tagMap['Protetor'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 7, tagId: tagMap['Grande Porte'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 7, tagId: tagMap['Microchipado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },

      // Whiskers (Domestic Cat) - ID 8
      { petId: 8, tagId: tagMap['Vacinado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 8, tagId: tagMap['Resgatado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 8, tagId: tagMap['Pequeno Porte'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 8, tagId: tagMap['Pelo Curto'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },

      // Duke (Boxer) - ID 9
      { petId: 9, tagId: tagMap['Castrado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 9, tagId: tagMap['Vacinado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 9, tagId: tagMap['Brincalhão'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 9, tagId: tagMap['Grande Porte'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 9, tagId: tagMap['Bom com Crianças'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },

      // Sasha (Russian Blue) - ID 10
      { petId: 10, tagId: tagMap['Castrado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 10, tagId: tagMap['Vacinado'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 10, tagId: tagMap['Calmo'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 10, tagId: tagMap['Pequeno Porte'], addedBy: null, createdAt: new Date(), updatedAt: new Date() },
      { petId: 10, tagId: tagMap['Pelo Curto'], addedBy: null, createdAt: new Date(), updatedAt: new Date() }
    ];

    // Filtrar apenas os relacionamentos que têm tanto petId quanto tagId válidos
    const validPetTags = petTags.filter(pt => pt.petId && pt.tagId);

    if (validPetTags.length > 0) {
      await queryInterface.bulkInsert('PetTags', validPetTags, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PetTags', null, {});
  }
};
