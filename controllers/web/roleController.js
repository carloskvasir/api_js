import { Permission, Role } from '../../models/index.js';
import { pickFields, ROLE_FIELDS } from '../../utils/sanitizer.js';

export const index = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [
        {
          model: Permission,
          as: 'permissions',
          through: { attributes: [] },
          attributes: ['id', 'name', 'resource', 'action']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.render('roles/index', {
      title: 'Roles do Sistema',
      roles
    });
  } catch (error) {
    console.error('Erro ao buscar roles:', error);
    res.render('roles/index', {
      title: 'Roles do Sistema',
      roles: [],
      error: 'Erro ao carregar os roles'
    });
  }
};

export const show = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id, {
      include: [
        {
          model: Permission,
          as: 'permissions',
          through: { attributes: [] },
          attributes: ['id', 'name', 'description', 'resource', 'action']
        }
      ]
    });

    if (!role) {
      return res.status(404).render('roles/show', {
        title: 'Role Não Encontrado',
        error: 'Role não encontrado'
      });
    }

    res.render('roles/show', {
      title: `Role: ${role.name}`,
      role
    });
  } catch (error) {
    console.error('Erro ao buscar role:', error);
    res.status(500).render('roles/show', {
      title: 'Erro',
      error: 'Erro interno do servidor'
    });
  }
};

export const create = async (req, res) => {
  try {
    const permissions = await Permission.findAll({
      order: [['resource', 'ASC'], ['action', 'ASC']]
    });

    // Organizar permissões por recurso
    const permissionsByResource = permissions.reduce((acc, permission) => {
      if (!acc[permission.resource]) {
        acc[permission.resource] = [];
      }
      acc[permission.resource].push(permission);
      return acc;
    }, {});

    res.render('roles/new', {
      title: 'Novo Role',
      permissions,
      permissionsByResource
    });
  } catch (error) {
    console.error('Erro ao carregar permissões:', error);
    res.render('roles/new', {
      title: 'Novo Role',
      permissions: [],
      permissionsByResource: {},
      error: 'Erro ao carregar permissões'
    });
  }
};

export const store = async (req, res) => {
  try {
    const { permissions, ...otherFields } = req.body;
    const sanitizedData = pickFields(otherFields, ROLE_FIELDS);
    
    // Validação básica
    if (!sanitizedData.name || sanitizedData.name.trim().length === 0) {
      const allPermissions = await Permission.findAll({
        order: [['resource', 'ASC'], ['action', 'ASC']]
      });
      
      return res.status(400).render('roles/new', {
        title: 'Novo Role',
        permissions: allPermissions,
        error: 'Nome do role é obrigatório',
        formData: req.body
      });
    }

    // Verificar se já existe um role com esse nome
    const existingRole = await Role.findOne({ where: { name: sanitizedData.name.trim() } });
    if (existingRole) {
      const allPermissions = await Permission.findAll({
        order: [['resource', 'ASC'], ['action', 'ASC']]
      });
      
      return res.status(400).render('roles/new', {
        title: 'Novo Role',
        permissions: allPermissions,
        error: 'Já existe um role com esse nome',
        formData: req.body
      });
    }

    // Criar o role
    const role = await Role.create(sanitizedData);

    // Associar permissões se fornecidas
    if (permissions && Array.isArray(permissions)) {
      const validPermissions = await Permission.findAll({
        where: { id: permissions }
      });
      
      if (validPermissions.length > 0) {
        await role.setPermissions(validPermissions);
      }
    }

    res.redirect(`/roles/${role.id}`);
  } catch (error) {
    console.error('Erro ao criar role:', error);
    const allPermissions = await Permission.findAll({
      order: [['resource', 'ASC'], ['action', 'ASC']]
    });
    
    res.status(500).render('roles/new', {
      title: 'Novo Role',
      permissions: allPermissions,
      error: 'Erro interno do servidor',
      formData: req.body
    });
  }
};

export const edit = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id, {
      include: [
        {
          model: Permission,
          as: 'permissions',
          through: { attributes: [] },
          attributes: ['id', 'name', 'resource', 'action', 'description']
        }
      ]
    });

    if (!role) {
      return res.status(404).render('roles/edit', {
        title: 'Role Não Encontrado',
        error: 'Role não encontrado'
      });
    }

    const allPermissions = await Permission.findAll({
      order: [['resource', 'ASC'], ['action', 'ASC']]
    });

    // Marcar permissões que o role já possui
    const rolePermissionIds = role.permissions.map(p => p.id);
    const permissionsWithChecked = allPermissions.map(permission => ({
      ...permission.toJSON(),
      checked: rolePermissionIds.includes(permission.id)
    }));

    res.render('roles/edit', {
      title: `Editar Role: ${role.name}`,
      role,
      permissions: permissionsWithChecked
    });
  } catch (error) {
    console.error('Erro ao buscar role para edição:', error);
    res.status(500).render('roles/edit', {
      title: 'Erro',
      error: 'Erro interno do servidor'
    });
  }
};

export const update = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    
    if (!role) {
      return res.status(404).render('roles/edit', {
        title: 'Role Não Encontrado',
        error: 'Role não encontrado'
      });
    }

    const { permissions, ...otherFields } = req.body;
    const sanitizedData = pickFields(otherFields, ROLE_FIELDS);
    
    // Validação básica
    if (!sanitizedData.name || sanitizedData.name.trim().length === 0) {
      const allPermissions = await Permission.findAll({
        order: [['resource', 'ASC'], ['action', 'ASC']]
      });
      
      return res.status(400).render('roles/edit', {
        title: `Editar Role: ${role.name}`,
        role,
        permissions: allPermissions,
        error: 'Nome do role é obrigatório',
        formData: req.body
      });
    }

    // Verificar se já existe outro role com esse nome
    const { Op } = await import('sequelize');
    const existingRole = await Role.findOne({ 
      where: { 
        name: sanitizedData.name.trim(),
        id: { [Op.ne]: role.id }
      } 
    });
    
    if (existingRole) {
      const allPermissions = await Permission.findAll({
        order: [['resource', 'ASC'], ['action', 'ASC']]
      });
      
      return res.status(400).render('roles/edit', {
        title: `Editar Role: ${role.name}`,
        role,
        permissions: allPermissions,
        error: 'Já existe outro role com esse nome',
        formData: req.body
      });
    }

    // Atualizar o role
    await role.update(sanitizedData);

    // Atualizar permissões
    if (permissions && Array.isArray(permissions)) {
      const validPermissions = await Permission.findAll({
        where: { id: permissions }
      });
      
      await role.setPermissions(validPermissions);
    } else {
      // Se nenhuma permissão foi selecionada, remover todas
      await role.setPermissions([]);
    }

    res.redirect(`/roles/${role.id}`);
  } catch (error) {
    console.error('Erro ao atualizar role:', error);
    res.status(500).render('roles/edit', {
      title: 'Erro',
      error: 'Erro interno do servidor'
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    
    if (!role) {
      return res.status(404).json({ error: 'Role não encontrado' });
    }

    // Remover associações com permissões
    await role.setPermissions([]);
    
    // Excluir o role
    await role.destroy();

    res.redirect('/roles');
  } catch (error) {
    console.error('Erro ao excluir role:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};