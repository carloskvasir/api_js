'use strict';



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const pets = [
      // Abrigo Patinhas Carinhosas (shelterId: 1)
      {
        name: 'Buddy',
        species: 'Cão',
        breed: 'Labrador',
        age: 3,
        description: 'Buddy é um cão muito carinhoso e brincalhão. Adora crianças e outros animais. Foi resgatado ainda filhote e agora está pronto para encontrar uma família para chamar de sua. É obediente, já sabe alguns comandos básicos e ama passear.',
        status: 'available',
        shelterId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Luna',
        species: 'Gato',
        breed: 'Siamês',
        age: 2,
        description: 'Luna é uma gatinha independente mas muito carinhosa. Gosta de brincar com bolinhas e dormir no sol. É castrada, vacinada e tem um miado muito doce. Ideal para quem busca uma companheira tranquila.',
        status: 'available',
        shelterId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Max',
        species: 'Cão',
        breed: 'Golden Retriever',
        age: 5,
        description: 'Max é um cão muito inteligente e leal. Excelente com crianças, é o tipo de pet que se tornará o melhor amigo da família. Adora nadar e buscar objetos. Precisa de exercícios diários e muito carinho.',
        status: 'pending',
        shelterId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bella',
        species: 'Cão',
        breed: 'Poodle',
        age: 4,
        description: 'Bella é uma cadela de porte médio, muito dócil e educada. Ideal para apartamentos, pois é calma e não late excessivamente. Adora colo e carinho, e convive bem com outros pets.',
        status: 'available',
        shelterId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Casa dos Peludos (shelterId: 2)
      {
        name: 'Thor',
        species: 'Cão',
        breed: 'Pastor Alemão',
        age: 6,
        description: 'Thor é um cão de guarda nato, muito fiel e protetor. Precisa de um tutor experiente e um quintal grande. É bem treinado e obediente, mas precisa de atividade física regular. Excelente para casas.',
        status: 'available',
        shelterId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mimi',
        species: 'Gato',
        breed: 'Persa',
        age: 3,
        description: 'Mimi é uma gatinha muito elegante e carinhosa. Tem pelos longos que precisam de escovação regular. É tranquila, gosta de ambientes calmos e é perfeita para quem quer um pet mais independente.',
        status: 'available',
        shelterId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rock',
        species: 'Cão',
        breed: 'Bulldog',
        age: 4,
        description: 'Rock é um bulldog muito simpático e tranquilo. Apesar da aparência forte, é muito gentil e adora crianças. Ideal para apartamentos, pois não precisa de muito exercício. Ronca um pouco, mas é puro amor.',
        status: 'adopted',
        shelterId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Lar Doce Lar Animal (shelterId: 3)
      {
        name: 'Princesa',
        species: 'Gato',
        breed: 'Angorá',
        age: 1,
        description: 'Princesa é uma gatinha jovem e muito brincalhona. Adora brinquedos e interagir com humanos. É muito social e se adapta facilmente a novos ambientes. Perfeita para quem quer um pet ativo e carinhoso.',
        status: 'available',
        shelterId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Duke',
        species: 'Cão',
        breed: 'Boxer',
        age: 2,
        description: 'Duke é um cão jovem e cheio de energia. Adora correr e brincar, sendo ideal para famílias ativas. É muito leal e protetor, mas também muito carinhoso. Precisa de exercícios diários e muito amor.',
        status: 'available',
        shelterId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mel',
        species: 'Cão',
        breed: 'Cocker Spaniel',
        age: 7,
        description: 'Mel é uma cadelinha mais madura, muito carinhosa e tranquila. Ideal para quem busca um pet calmo e companheiro. Adora passear devagar e receber carinho. É muito educada e obediente.',
        status: 'pending',
        shelterId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Amigos de Quatro Patas (shelterId: 4)
      {
        name: 'Simba',
        species: 'Gato',
        breed: 'Maine Coon',
        age: 4,
        description: 'Simba é um gato grande e majestoso, mas com coração de filhote. Muito carinhoso e social, adora brincar e receber atenção. Convive bem com outros gatos e é ideal para famílias que querem um pet carismático.',
        status: 'available',
        shelterId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nina',
        species: 'Cão',
        breed: 'Shih Tzu',
        age: 3,
        description: 'Nina é uma cadelinha pequena e muito dócil. Perfeita para apartamentos e famílias com crianças. É tranquila, não late muito e adora colo. Seus pelos precisam de cuidados regulares, mas ela retribui com muito amor.',
        status: 'available',
        shelterId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Refúgio Vida Animal (shelterId: 5)
      {
        name: 'Zeus',
        species: 'Cão',
        breed: 'Rottweiler',
        age: 5,
        description: 'Zeus é um cão grande e imponente, mas muito carinhoso com quem conhece. Precisa de um tutor experiente e um ambiente adequado ao seu porte. É leal, protetor e muito inteligente.',
        status: 'available',
        shelterId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nala',
        species: 'Gato',
        breed: 'Ragdoll',
        age: 2,
        description: 'Nala é uma gatinha extremamente dócil e relaxada. A raça Ragdoll é conhecida por ser muito tranquila e carinhosa. Ela adora colo e é perfeita para quem quer um pet muito afetuoso e calmo.',
        status: 'available',
        shelterId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Patas Solidárias (shelterId: 6)
      {
        name: 'Toby',
        species: 'Cão',
        breed: 'Beagle',
        age: 3,
        description: 'Toby é um beagle muito esperto e brincalhão. Adora farejar e explorar, sendo ideal para famílias que gostam de atividades ao ar livre. É sociável, carinhoso e convive bem com outros pets.',
        status: 'available',
        shelterId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lily',
        species: 'Gato',
        breed: 'British Shorthair',
        age: 4,
        description: 'Lily é uma gata muito elegante e independente. Gosta de observar o movimento da casa de um cantinho confortável, mas também adora carinho quando está no humor. É ideal para quem respeita o espaço dos felinos.',
        status: 'available',
        shelterId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Pets', pets, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pets', null, {});
  }
};
