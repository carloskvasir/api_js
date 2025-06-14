import { Op } from 'sequelize';
import { Pet, PetTag, Tag } from '../../models/index.js';
import { pickFields, TAG_FIELDS } from '../../utils/sanitizer.js';

// Listar todas as tags
export const index = async (req, res) => {
  try {
    const { category, search } = req.query;
    
    const whereClause = { isActive: true };
    
    // Filtro por categoria
    if (category && category !== 'all') {
      whereClause.category = category;
    }
    
    // Filtro por busca
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const tags = await Tag.findAll({
      where: whereClause,
      order: [['category', 'ASC'], ['name', 'ASC']],
      include: [{
        model: Pet,
        as: 'pets',
        through: { attributes: [] },
        required: false,
        where: { status: 'available' }
      }]
    });

    // Adicionar URLs de ação para cada tag
    const plainTags = tags.map(tag => ({
      ...tag.get({ plain: true }),
      viewUrl: `/tags/${tag.id}`,
      editUrl: `/tags/${tag.id}/edit`,
      deleteUrl: `/tags/${tag.id}`,
      petCount: tag.pets ? tag.pets.length : 0
    }));

    // Obter categorias para o filtro
    const categories = [
      { value: 'all', label: 'Todas as categorias' },
      { value: 'health', label: 'Saúde' },
      { value: 'behavior', label: 'Comportamento' },
      { value: 'physical', label: 'Características Físicas' },
      { value: 'care', label: 'Cuidados' },
      { value: 'other', label: 'Outros' }
    ];

    res.render('tags/index', {
      title: 'Gerenciar Tags',
      tags: plainTags,
      categories,
      currentCategory: category || 'all',
      searchQuery: search || '',
      totalTags: plainTags.length
    });
  } catch (error) {
    res.status(500).render('shared/error', { 
      error: error.message,
      title: 'Erro ao carregar tags'
    });
  }
};

// Exibir formulário para criar nova tag
export const new_ = async (req, res) => {
  try {
    const categories = [
      { value: 'health', label: 'Saúde' },
      { value: 'behavior', label: 'Comportamento' },
      { value: 'physical', label: 'Características Físicas' },
      { value: 'care', label: 'Cuidados' },
      { value: 'other', label: 'Outros' }
    ];

    res.render('tags/new', {
      title: 'Nova Tag',
      categories,
      tag: {} // Tag vazia para o formulário
    });
  } catch (error) {
    res.status(500).render('shared/error', { 
      error: error.message,
      title: 'Erro ao carregar formulário'
    });
  }
};

// Criar nova tag
export const create = async (req, res) => {
  try {
    const sanitizedData = pickFields(req.body, TAG_FIELDS);
    // Adicionar campos padrão que não vêm do usuário
    sanitizedData.isActive = true;
    sanitizedData.color = sanitizedData.color || '#007bff';
    sanitizedData.category = sanitizedData.category || 'other';

    const tag = await Tag.create(sanitizedData);

    res.redirect(`/tags/${tag.id}?success=Tag criada com sucesso`);
  } catch (error) {
    const categories = [
      { value: 'health', label: 'Saúde' },
      { value: 'behavior', label: 'Comportamento' },
      { value: 'physical', label: 'Características Físicas' },
      { value: 'care', label: 'Cuidados' },
      { value: 'other', label: 'Outros' }
    ];

    res.render('tags/new', {
      title: 'Nova Tag',
      categories,
      tag: req.body,
      error: error.message
    });
  }
};

// Exibir detalhes de uma tag
export const show = async (req, res) => {
  try {
    const { id } = req.params;
    const { success } = req.query;

    const tag = await Tag.findByPk(id, {
      include: [{
        model: Pet,
        as: 'pets',
        through: { attributes: ['createdAt'] },
        where: { status: 'available' },
        required: false,
        include: [{
          model: Tag,
          as: 'tags',
          through: { attributes: [] },
          where: { isActive: true },
          required: false
        }]
      }]
    });

    if (!tag) {
      return res.status(404).render('shared/error', {
        error: 'Tag não encontrada',
        title: 'Tag não encontrada'
      });
    }

    // Adicionar URLs para os pets
    const petsWithUrls = tag.pets.map(pet => ({
      ...pet.get({ plain: true }),
      viewUrl: `/pets/${pet.id}`,
      editUrl: `/pets/${pet.id}/edit`
    }));

    // Obter estatísticas da tag
    const totalPets = petsWithUrls.length;
    const speciesCount = petsWithUrls.reduce((acc, pet) => {
      acc[pet.species] = (acc[pet.species] || 0) + 1;
      return acc;
    }, {});

    const plainTag = {
      ...tag.get({ plain: true }),
      editUrl: `/tags/${tag.id}/edit`,
      deleteUrl: `/tags/${tag.id}`,
      pets: petsWithUrls
    };

    res.render('tags/show', {
      title: `Tag: ${tag.name}`,
      tag: plainTag,
      totalPets,
      speciesCount,
      successMessage: success
    });
  } catch (error) {
    res.status(500).render('shared/error', { 
      error: error.message,
      title: 'Erro ao carregar tag'
    });
  }
};

// Exibir formulário para editar tag
export const edit = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).render('shared/error', {
        error: 'Tag não encontrada',
        title: 'Tag não encontrada'
      });
    }

    const categories = [
      { value: 'health', label: 'Saúde' },
      { value: 'behavior', label: 'Comportamento' },
      { value: 'physical', label: 'Características Físicas' },
      { value: 'care', label: 'Cuidados' },
      { value: 'other', label: 'Outros' }
    ];

    res.render('tags/edit', {
      title: `Editar Tag: ${tag.name}`,
      tag: tag.get({ plain: true }),
      categories
    });
  } catch (error) {
    res.status(500).render('shared/error', { 
      error: error.message,
      title: 'Erro ao carregar formulário'
    });
  }
};

// Atualizar tag
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).render('shared/error', {
        error: 'Tag não encontrada',
        title: 'Tag não encontrada'
      });
    }

    const sanitizedData = pickFields(req.body, [...TAG_FIELDS, 'isActive']);
    // Processar campos especiais
    sanitizedData.color = sanitizedData.color || '#007bff';
    sanitizedData.category = sanitizedData.category || 'other';
    sanitizedData.isActive = sanitizedData.isActive === 'on' || sanitizedData.isActive === 'true';

    await tag.update(sanitizedData);

    res.redirect(`/tags/${tag.id}?success=Tag atualizada com sucesso`);
  } catch (error) {
    const { id } = req.params;
    const categories = [
      { value: 'health', label: 'Saúde' },
      { value: 'behavior', label: 'Comportamento' },
      { value: 'physical', label: 'Características Físicas' },
      { value: 'care', label: 'Cuidados' },
      { value: 'other', label: 'Outros' }
    ];

    res.render('tags/edit', {
      title: 'Editar Tag',
      tag: { id, ...req.body },
      categories,
      error: error.message
    });
  }
};

// Excluir tag (soft delete)
export const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).render('shared/error', {
        error: 'Tag não encontrada',
        title: 'Tag não encontrada'
      });
    }

    // Soft delete - marcar como inativa
    await tag.update({ isActive: false });

    res.redirect('/tags?success=Tag desativada com sucesso');
  } catch (error) {
    res.status(500).render('shared/error', { 
      error: error.message,
      title: 'Erro ao excluir tag'
    });
  }
};

// Página de estatísticas das tags (versão simplificada)
export const stats = async (req, res) => {
  try {
    // Labels para categorias
    const categoryLabels = {
      health: 'Saúde',
      behavior: 'Comportamento', 
      physical: 'Características Físicas',
      care: 'Cuidados',
      other: 'Outros'
    };

    // Buscar todas as tags ativas com seus pets (método simples)
    const allTags = await Tag.findAll({
      where: { isActive: true },
      include: [{
        model: Pet,
        as: 'pets',
        through: { attributes: [] },
        where: { status: 'available' },
        required: false
      }],
      order: [['name', 'ASC']]
    });

    // Processar dados de forma simples
    const tagStats = allTags
      .map(tag => ({
        id: tag.id,
        name: tag.name,
        description: tag.description,
        color: tag.color,
        category: tag.category,
        usageCount: tag.pets?.length || 0,
        viewUrl: `/tags/${tag.id}`
      }))
      .sort((a, b) => b.usageCount - a.usageCount); // Ordenar por uso

    // Top 10 mais usadas
    const mostUsedTags = tagStats.slice(0, 10);

    // Estatísticas por categoria (usando reduce - mais elegante)
    const categoryStats = Object.entries(
      allTags.reduce((acc, tag) => {
        acc[tag.category] = (acc[tag.category] || 0) + 1;
        return acc;
      }, {})
    ).map(([category, count]) => ({
      category,
      count,
      label: categoryLabels[category] || category
    }));

    // Métricas simples
    const totalTags = allTags.length;
    const totalRelationships = await PetTag.count();
    const maxUsage = tagStats[0]?.usageCount || 0;

    res.render('tags/stats', {
      title: 'Estatísticas das Tags',
      mostUsedTags,
      categoryStats,
      totalTags,
      totalRelationships,
      maxUsage
    });
  } catch (error) {
    console.error('Erro nas estatísticas:', error);
    res.status(500).render('shared/error', { 
      error: error.message,
      title: 'Erro ao carregar estatísticas'
    });
  }
};
