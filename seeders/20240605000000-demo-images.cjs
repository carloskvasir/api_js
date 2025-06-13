'use strict';
// 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    // Array de dados das imagens: [petId, url, texto]
    const imageData = [
      // Buddy (petId: 1)
      [1, '800x600/4A90E2/FFFFFF', 'Buddy+Labrador'],
      [1, '600x800/7ED321/FFFFFF', 'Buddy+Portrait'],
      
      // Luna (petId: 2)
      [2, '800x600/F5A623/FFFFFF', 'Luna+Siames'],
      [2, '600x600/D0021B/FFFFFF', 'Luna+Playing'],
      
      // Max (petId: 3)
      [3, '800x600/50E3C2/FFFFFF', 'Max+Golden'],
      [3, '800x500/B8E986/FFFFFF', 'Max+Swimming'],
      [3, '700x600/9013FE/FFFFFF', 'Max+Kids'],
      
      // Bella (petId: 4)
      [4, '600x800/FF6B6B/FFFFFF', 'Bella+Poodle'],
      [4, '800x600/4ECDC4/FFFFFF', 'Bella+Garden'],
      
      // Thor (petId: 5)
      [5, '800x800/45B7D1/FFFFFF', 'Thor+Pastor'],
      [5, '800x600/96CEB4/FFFFFF', 'Thor+Training'],
      
      // Mimi (petId: 6)
      [6, '800x600/FECA57/FFFFFF', 'Mimi+Persa'],
      [6, '600x600/FF9FF3/FFFFFF', 'Mimi+Playing'],
      
      // Rock (petId: 7)
      [7, '800x600/8E44AD/FFFFFF', 'Rock+Bulldog'],
      
      // Princesa (petId: 8)
      [8, '800x600/54A0FF/FFFFFF', 'Princesa+Angora'],
      [8, '600x800/5F27CD/FFFFFF', 'Princesa+Play'],
      
      // Duke (petId: 9)
      [9, '800x600/00D2D3/FFFFFF', 'Duke+Boxer'],
      [9, '800x500/FF6348/FFFFFF', 'Duke+Rest'],
      
      // Mel (petId: 10)
      [10, '800x600/FF7675/FFFFFF', 'Mel+Cocker'],
      
      // Simba (petId: 11)
      [11, '800x600/74B9FF/FFFFFF', 'Simba+Maine'],
      [11, '600x600/A29BFE/FFFFFF', 'Simba+Play'],
      
      // Nina (petId: 12)
      [12, '600x800/FD79A8/FFFFFF', 'Nina+Shih+Tzu'],
      
      // Zeus (petId: 13)
      [13, '800x800/6C5CE7/FFFFFF', 'Zeus+Rottweiler'],
      [13, '800x600/FDCB6E/FFFFFF', 'Zeus+Garden'],
      
      // Nala (petId: 14)
      [14, '800x600/E17055/FFFFFF', 'Nala+Ragdoll'],
      
      // Toby (petId: 15)
      [15, '800x600/00B894/FFFFFF', 'Toby+Beagle'],
      [15, '700x600/81ECEC/FFFFFF', 'Toby+Sniff'],
      
      // Lily (petId: 16)
      [16, '800x600/FAB1A0/FFFFFF', 'Lily+British'],
      [16, '600x800/00CEC9/FFFFFF', 'Lily+Watch']
    ];

    // Gerar URLs e inserir dados
    for (const [petId, dimensions, text] of imageData) {
      const url = `https://placehold.co/${dimensions}?text=${text}`;
      
      await queryInterface.sequelize.query(
        `INSERT INTO "Images" ("petId", url, "createdAt") 
         VALUES (?, ?, ?)`,
        {
          replacements: [petId, url, new Date()],
          type: queryInterface.sequelize.QueryTypes.INSERT
        }
      );
    }
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  }
};