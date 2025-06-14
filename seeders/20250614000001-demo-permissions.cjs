'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const permissions = [
      // Users permissions
      { name: 'Criar Usuários', description: 'Permite criar novos usuários no sistema', resource: 'users', action: 'create' },
      { name: 'Visualizar Usuários', description: 'Permite visualizar informações dos usuários', resource: 'users', action: 'read' },
      { name: 'Editar Usuários', description: 'Permite editar informações dos usuários', resource: 'users', action: 'update' },
      { name: 'Excluir Usuários', description: 'Permite excluir usuários do sistema', resource: 'users', action: 'delete' },
      { name: 'Gerenciar Usuários', description: 'Permite todas as operações com usuários', resource: 'users', action: 'manage' },

      // Pets permissions
      { name: 'Criar Pets', description: 'Permite cadastrar novos pets para adoção', resource: 'pets', action: 'create' },
      { name: 'Visualizar Pets', description: 'Permite visualizar informações dos pets', resource: 'pets', action: 'read' },
      { name: 'Editar Pets', description: 'Permite editar informações dos pets', resource: 'pets', action: 'update' },
      { name: 'Excluir Pets', description: 'Permite remover pets do sistema', resource: 'pets', action: 'delete' },
      { name: 'Gerenciar Pets', description: 'Permite todas as operações com pets', resource: 'pets', action: 'manage' },

      // Shelters permissions
      { name: 'Criar Abrigos', description: 'Permite cadastrar novos abrigos', resource: 'shelters', action: 'create' },
      { name: 'Visualizar Abrigos', description: 'Permite visualizar informações dos abrigos', resource: 'shelters', action: 'read' },
      { name: 'Editar Abrigos', description: 'Permite editar informações dos abrigos', resource: 'shelters', action: 'update' },
      { name: 'Excluir Abrigos', description: 'Permite excluir abrigos do sistema', resource: 'shelters', action: 'delete' },
      { name: 'Gerenciar Abrigos', description: 'Permite todas as operações com abrigos', resource: 'shelters', action: 'manage' },

      // Adoptions permissions
      { name: 'Criar Solicitações de Adoção', description: 'Permite criar solicitações de adoção', resource: 'adoptions', action: 'create' },
      { name: 'Visualizar Solicitações de Adoção', description: 'Permite visualizar solicitações de adoção', resource: 'adoptions', action: 'read' },
      { name: 'Editar Solicitações de Adoção', description: 'Permite editar solicitações de adoção', resource: 'adoptions', action: 'update' },
      { name: 'Excluir Solicitações de Adoção', description: 'Permite excluir solicitações de adoção', resource: 'adoptions', action: 'delete' },
      { name: 'Gerenciar Solicitações de Adoção', description: 'Permite todas as operações com solicitações de adoção', resource: 'adoptions', action: 'manage' },

      // Tags permissions
      { name: 'Criar Tags', description: 'Permite criar novas tags para categorização', resource: 'tags', action: 'create' },
      { name: 'Visualizar Tags', description: 'Permite visualizar tags existentes', resource: 'tags', action: 'read' },
      { name: 'Editar Tags', description: 'Permite editar tags existentes', resource: 'tags', action: 'update' },
      { name: 'Excluir Tags', description: 'Permite excluir tags do sistema', resource: 'tags', action: 'delete' },
      { name: 'Gerenciar Tags', description: 'Permite todas as operações com tags', resource: 'tags', action: 'manage' },

      // Images permissions
      { name: 'Criar Imagens', description: 'Permite fazer upload de imagens', resource: 'images', action: 'create' },
      { name: 'Visualizar Imagens', description: 'Permite visualizar imagens', resource: 'images', action: 'read' },
      { name: 'Editar Imagens', description: 'Permite editar informações das imagens', resource: 'images', action: 'update' },
      { name: 'Excluir Imagens', description: 'Permite excluir imagens', resource: 'images', action: 'delete' },
      { name: 'Gerenciar Imagens', description: 'Permite todas as operações com imagens', resource: 'images', action: 'manage' },

      // Roles permissions
      { name: 'Criar Roles', description: 'Permite criar novos roles no sistema', resource: 'roles', action: 'create' },
      { name: 'Visualizar Roles', description: 'Permite visualizar roles existentes', resource: 'roles', action: 'read' },
      { name: 'Editar Roles', description: 'Permite editar roles existentes', resource: 'roles', action: 'update' },
      { name: 'Excluir Roles', description: 'Permite excluir roles do sistema', resource: 'roles', action: 'delete' },
      { name: 'Gerenciar Roles', description: 'Permite todas as operações com roles', resource: 'roles', action: 'manage' },

      // Permissions permissions
      { name: 'Criar Permissões', description: 'Permite criar novas permissões', resource: 'permissions', action: 'create' },
      { name: 'Visualizar Permissões', description: 'Permite visualizar permissões existentes', resource: 'permissions', action: 'read' },
      { name: 'Editar Permissões', description: 'Permite editar permissões existentes', resource: 'permissions', action: 'update' },
      { name: 'Excluir Permissões', description: 'Permite excluir permissões do sistema', resource: 'permissions', action: 'delete' },
      { name: 'Gerenciar Permissões', description: 'Permite todas as operações com permissões', resource: 'permissions', action: 'manage' }
    ];

    // Adicionar timestamps
    const now = new Date();
    const permissionsWithTimestamps = permissions.map(permission => ({
      ...permission,
      created_at: now,
      updated_at: now
    }));

    await queryInterface.bulkInsert('Permissions', permissionsWithTimestamps, {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {});
  }
};
