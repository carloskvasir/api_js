import { Permission, Role } from '../../models/index.js';
import { PERMISSION_FIELDS, pickFields } from '../../utils/sanitizer.js';

export const index = async (req, res) => {
  try {
    const permissions = await Permission.findAll({
      include: [
        {
          model: Role,
          as: 'roles',
          through: { attributes: [] },
          attributes: ['id', 'name']
        }
      ],
      order: [['resource', 'ASC'], ['action', 'ASC']]
    });

    res.render('permissions/index', {
      title: 'Permissões do Sistema',
      permissions
    });
  } catch (error) {
    console.error('Erro ao buscar permissões:', error);
    res.render('permissions/index', {
      title: 'Permissões do Sistema',
      permissions: [],
      error: 'Erro ao carregar as permissões'
    });
  }
};

export const show = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id, {
      include: [
        {
          model: Role,
          as: 'roles',
          through: { attributes: [] },
          attributes: ['id', 'name', 'description']
        }
      ]
    });

    if (!permission) {
      return res.status(404).render('permissions/show', {
        title: 'Permissão Não Encontrada',
        error: 'Permissão não encontrada'
      });
    }

    res.render('permissions/show', {
      title: `Permissão: ${permission.name}`,
      permission
    });
  } catch (error) {
    console.error('Erro ao buscar permissão:', error);
    res.status(500).render('permissions/show', {
      title: 'Erro',
      error: 'Erro interno do servidor'
    });
  }
};

export const create = async (req, res) => {
  res.render('permissions/new', {
    title: 'Nova Permissão'
  });
};

export const store = async (req, res) => {
  try {
    const sanitizedData = pickFields(req.body, PERMISSION_FIELDS);
    
    // Validação básica
    if (!sanitizedData.name || sanitizedData.name.trim().length === 0) {
      return res.status(400).render('permissions/new', {
        title: 'Nova Permissão',
        error: 'Nome da permissão é obrigatório',
        formData: req.body
      });
    }

    if (!sanitizedData.resource || !sanitizedData.action) {
      return res.status(400).render('permissions/new', {
        title: 'Nova Permissão',
        error: 'Recurso e ação são obrigatórios',
        formData: req.body
      });
    }

    // Verificar se já existe uma permissão com esse recurso e ação
    const existingPermission = await Permission.findOne({ 
      where: { 
        resource: sanitizedData.resource.trim(),
        action: sanitizedData.action.trim()
      } 
    });
    
    if (existingPermission) {
      return res.status(400).render('permissions/new', {
        title: 'Nova Permissão',
        error: 'Já existe uma permissão para este recurso e ação',
        formData: req.body
      });
    }

    // Criar a permissão
    const permission = await Permission.create(sanitizedData);

    res.redirect(`/permissions/${permission.id}`);
  } catch (error) {
    console.error('Erro ao criar permissão:', error);
    res.status(500).render('permissions/new', {
      title: 'Nova Permissão',
      error: 'Erro interno do servidor',
      formData: req.body
    });
  }
};

export const edit = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);

    if (!permission) {
      return res.status(404).render('permissions/edit', {
        title: 'Permissão Não Encontrada',
        error: 'Permissão não encontrada'
      });
    }

    res.render('permissions/edit', {
      title: `Editar Permissão: ${permission.name}`,
      permission
    });
  } catch (error) {
    console.error('Erro ao buscar permissão para edição:', error);
    res.status(500).render('permissions/edit', {
      title: 'Erro',
      error: 'Erro interno do servidor'
    });
  }
};

export const update = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    
    if (!permission) {
      return res.status(404).render('permissions/edit', {
        title: 'Permissão Não Encontrada',
        error: 'Permissão não encontrada'
      });
    }

    const { name, description, resource, action } = req.body;
    
    // Validação básica
    if (!name || name.trim().length === 0) {
      return res.status(400).render('permissions/edit', {
        title: `Editar Permissão: ${permission.name}`,
        permission,
        error: 'Nome da permissão é obrigatório',
        formData: req.body
      });
    }

    if (!resource || !action) {
      return res.status(400).render('permissions/edit', {
        title: `Editar Permissão: ${permission.name}`,
        permission,
        error: 'Recurso e ação são obrigatórios',
        formData: req.body
      });
    }

    // Verificar se já existe outra permissão com esse recurso e ação
    const { Op } = await import('sequelize');
    const existingPermission = await Permission.findOne({ 
      where: { 
        resource: resource.trim(),
        action: action.trim(),
        id: { [Op.ne]: permission.id }
      } 
    });
    
    if (existingPermission) {
      return res.status(400).render('permissions/edit', {
        title: `Editar Permissão: ${permission.name}`,
        permission,
        error: 'Já existe outra permissão para este recurso e ação',
        formData: req.body
      });
    }

    // Atualizar a permissão
    await permission.update({
      name: name.trim(),
      description: description ? description.trim() : null,
      resource: resource.trim(),
      action: action.trim()
    });

    res.redirect(`/permissions/${permission.id}`);
  } catch (error) {
    console.error('Erro ao atualizar permissão:', error);
    res.status(500).render('permissions/edit', {
      title: 'Erro',
      error: 'Erro interno do servidor'
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    
    if (!permission) {
      return res.status(404).json({ error: 'Permissão não encontrada' });
    }

    // Remover associações com roles
    await permission.setRoles([]);
    
    // Excluir a permissão
    await permission.destroy();

    res.redirect('/permissions');
  } catch (error) {
    console.error('Erro ao excluir permissão:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};