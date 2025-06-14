'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    // Buscar os IDs dos roles e permissions
    const [roles] = await queryInterface.sequelize.query(
      'SELECT id, name FROM "Roles" WHERE name IN (\'Admin\', \'Shelter\', \'Adopter\')'
    );

    const [permissions] = await queryInterface.sequelize.query(
      'SELECT id, name, resource, action FROM "Permissions"'
    );

    const adminRole = roles.find(r => r.name === 'Admin');
    const shelterRole = roles.find(r => r.name === 'Shelter');
    const adopterRole = roles.find(r => r.name === 'Adopter');

    const rolePermissions = [];
    const now = new Date();

    // ADMIN: Todas as permissões
    permissions.forEach(permission => {
      rolePermissions.push({
        role_id: adminRole.id,
        permission_id: permission.id,
        created_at: now,
        updated_at: now
      });
    });

    // SHELTER: Permissões específicas para abrigos
    const shelterPermissions = permissions.filter(p => 
      // Pode gerenciar pets
      (p.resource === 'pets' && ['create', 'read', 'update', 'delete'].includes(p.action)) ||
      // Pode gerenciar seu próprio abrigo
      (p.resource === 'shelters' && ['read', 'update'].includes(p.action)) ||
      // Pode gerenciar adoções
      (p.resource === 'adoptions' && ['read', 'update'].includes(p.action)) ||
      // Pode gerenciar tags
      (p.resource === 'tags' && ['create', 'read', 'update'].includes(p.action)) ||
      // Pode gerenciar imagens dos pets
      (p.resource === 'images' && ['create', 'read', 'update', 'delete'].includes(p.action)) ||
      // Pode visualizar usuários (adotantes)
      (p.resource === 'users' && p.action === 'read')
    );

    shelterPermissions.forEach(permission => {
      rolePermissions.push({
        role_id: shelterRole.id,
        permission_id: permission.id,
        created_at: now,
        updated_at: now
      });
    });

    // ADOPTER: Permissões básicas para adotantes
    const adopterPermissions = permissions.filter(p => 
      // Pode visualizar pets
      (p.resource === 'pets' && p.action === 'read') ||
      // Pode visualizar abrigos
      (p.resource === 'shelters' && p.action === 'read') ||
      // Pode criar e visualizar suas próprias solicitações de adoção
      (p.resource === 'adoptions' && ['create', 'read'].includes(p.action)) ||
      // Pode visualizar tags
      (p.resource === 'tags' && p.action === 'read') ||
      // Pode visualizar imagens
      (p.resource === 'images' && p.action === 'read')
    );

    adopterPermissions.forEach(permission => {
      rolePermissions.push({
        role_id: adopterRole.id,
        permission_id: permission.id,
        created_at: now,
        updated_at: now
      });
    });

    await queryInterface.bulkInsert('RolePermissions', rolePermissions, {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('RolePermissions', null, {});
  }
};
