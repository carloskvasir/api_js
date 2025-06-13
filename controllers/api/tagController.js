import { Op } from 'sequelize';
import sequelize from '../../config/sequelize.js';
import Pet from '../../models/Pet.js';
import PetTag from '../../models/PetTag.js';
import Tag from '../../models/Tag.js';

// Listar todos os pets com suas tags
export const getPetsWithTags = async (req, res) => {
  try {
    const pets = await Pet.findAll({
      include: [{
        model: Tag,
        as: 'tags',
        through: { attributes: [] }, // Não incluir atributos da tabela intermediária
        where: { isActive: true },
        required: false
      }],
      where: { status: 'available' }
    });

    res.json({
      success: true,
      data: pets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Buscar pets por tags específicas
export const searchPetsByTags = async (req, res) => {
  try {
    const { tagIds } = req.query; // Ex: ?tagIds=1,2,3
    const tagIdArray = tagIds.split(',').map(id => parseInt(id));

    const pets = await Pet.findAll({
      include: [{
        model: Tag,
        as: 'tags',
        through: { attributes: [] },
        where: { 
          id: tagIdArray,
          isActive: true 
        }
      }],
      where: { status: 'available' }
    });

    res.json({
      success: true,
      data: pets,
      filters: {
        tags: tagIdArray
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Adicionar tags a um pet
export const addTagsToPet = async (req, res) => {
  try {
    const { petId } = req.params;
    const { tagIds, addedBy } = req.body;

    // Verificar se o pet existe
    const pet = await Pet.findByPk(petId);
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Pet não encontrado'
      });
    }

    // Adicionar as tags
    await PetTag.addTagsToPet(petId, tagIds, addedBy);

    // Retornar o pet atualizado com as tags
    const updatedPet = await Pet.findByPk(petId, {
      include: [{
        model: Tag,
        as: 'tags',
        through: { attributes: ['addedBy', 'createdAt'] }
      }]
    });

    res.json({
      success: true,
      message: 'Tags adicionadas com sucesso',
      data: updatedPet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Remover tag de um pet
export const removeTagFromPet = async (req, res) => {
  try {
    const { petId, tagId } = req.params;

    const removed = await PetTag.destroy({
      where: { petId, tagId }
    });

    if (removed) {
      res.json({
        success: true,
        message: 'Tag removida com sucesso'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Relacionamento não encontrado'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Listar todas as tags disponíveis por categoria
export const getTagsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const tags = await Tag.getByCategory(category);

    res.json({
      success: true,
      data: tags,
      category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Estatísticas de uso das tags
export const getTagUsageStats = async (req, res) => {
  try {
    // Buscar tags mais usadas com uma query manual mais simples
    const mostUsedTags = await sequelize.query(`
      SELECT 
        t.id, 
        t.name, 
        t.description, 
        t.color, 
        t.category,
        COUNT(pt.id) as "usageCount"
      FROM "Tags" t
      LEFT JOIN "PetTags" pt ON t.id = pt."tagId"
      WHERE t."isActive" = true
      GROUP BY t.id, t.name, t.description, t.color, t.category
      ORDER BY "usageCount" DESC
      LIMIT 15
    `, { type: sequelize.QueryTypes.SELECT });

    const tagCategories = await Tag.findAll({
      attributes: [
        'category',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { isActive: true },
      group: ['category']
    });

    res.json({
      success: true,
      data: {
        mostUsedTags,
        categoriesCount: tagCategories
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Busca avançada de pets com múltiplos filtros incluindo tags
export const advancedPetSearch = async (req, res) => {
  try {
    const { 
      species, 
      breed, 
      ageMin, 
      ageMax, 
      tagIds, 
      shelterId 
    } = req.query;

    const whereClause = { status: 'available' };
    const includeClause = [
      {
        model: Tag,
        as: 'tags',
        through: { attributes: [] },
        required: false
      }
    ];

    // Filtros básicos
    if (species) whereClause.species = species;
    if (breed) whereClause.breed = breed;
    if (shelterId) whereClause.shelterId = shelterId;
    
    // Filtro de idade
    if (ageMin || ageMax) {
      whereClause.age = {};
      if (ageMin) whereClause.age[Op.gte] = parseInt(ageMin);
      if (ageMax) whereClause.age[Op.lte] = parseInt(ageMax);
    }

    // Filtro de tags
    if (tagIds) {
      const tagIdArray = tagIds.split(',').map(id => parseInt(id));
      includeClause[0].where = { 
        id: tagIdArray,
        isActive: true 
      };
      includeClause[0].required = true;
    }

    const pets = await Pet.findAll({
      where: whereClause,
      include: includeClause,
      distinct: true
    });

    res.json({
      success: true,
      data: pets,
      filters: {
        species,
        breed,
        ageMin,
        ageMax,
        tagIds: tagIds ? tagIds.split(',') : null,
        shelterId
      },
      count: pets.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Funções básicas CRUD para Tags
export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      where: { isActive: true },
      order: [['category', 'ASC'], ['name', 'ASC']]
    });

    res.json({
      success: true,
      data: tags
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const tag = await Tag.findByPk(id, {
      include: [{
        model: Pet,
        as: 'pets',
        through: { attributes: [] },
        where: { status: 'available' },
        required: false
      }]
    });

    if (!tag) {
      return res.status(404).json({
        success: false,
        message: 'Tag não encontrada'
      });
    }

    res.json({
      success: true,
      data: tag
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const createTag = async (req, res) => {
  try {
    const { name, description, color, category } = req.body;

    const tag = await Tag.create({
      name,
      description,
      color,
      category,
      isActive: true
    });

    res.status(201).json({
      success: true,
      message: 'Tag criada com sucesso',
      data: tag
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, color, category, isActive } = req.body;

    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({
        success: false,
        message: 'Tag não encontrada'
      });
    }

    await tag.update({
      name,
      description,
      color,
      category,
      isActive
    });

    res.json({
      success: true,
      message: 'Tag atualizada com sucesso',
      data: tag
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({
        success: false,
        message: 'Tag não encontrada'
      });
    }

    // Soft delete - marcar como inativa
    await tag.update({ isActive: false });

    res.json({
      success: true,
      message: 'Tag desativada com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
