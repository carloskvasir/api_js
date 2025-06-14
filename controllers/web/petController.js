import { Pet, Shelter, Tag } from '../../models/index.js';
import { PET_FIELDS, pickFields } from '../../utils/sanitizer.js';

export const index = async (req, res) => {
  try {
    const pets = await Pet.findAll({
      include: [
        { 
          model: Shelter, 
          as: 'shelter',
          attributes: ['name'] 
        },
        { 
          model: Tag, 
          as: 'tags',
          through: { attributes: [] },
          where: { isActive: true },
          required: false
        }
      ]
    });
    const plainPets = pets.map(pet => ({
      ...pet.get({ plain: true }),
      viewUrl: `/pets/${pet.id}`,
      editUrl: `/pets/${pet.id}/edit`,
      deleteUrl: `/pets/${pet.id}`
    }));
    res.render('pets/index', {
      title: 'Pets',
      pets: plainPets
    });
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};

export const show = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id, {
      include: [
        { 
          model: Shelter, 
          as: 'shelter',
          attributes: ['name', 'email', 'phone'] 
        },
        { 
          model: Tag, 
          as: 'tags',
          through: { attributes: [] },
          where: { isActive: true },
          required: false
        }
      ]
    });
    
    if (!pet) {
      return res.status(404).render('shared/error', {
        error: 'Pet não encontrado'
      });
    }

    res.render('pets/show', {
      title: pet.name,
      pet: pet.get({ plain: true })
    });
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const [shelters, tags] = await Promise.all([
      Shelter.findAll(),
      Tag.findAll({ where: { isActive: true }, order: [['category', 'ASC'], ['name', 'ASC']] })
    ]);
    res.render('pets/new', {
      title: 'Novo Pet',
      shelters: shelters.map(shelter => shelter.get({ plain: true })),
      tags: tags.map(tag => tag.get({ plain: true }))
    });
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};

export const store = async (req, res) => {
  try {
    const { tags, ...otherFields } = req.body;
    const petData = pickFields(otherFields, PET_FIELDS);
    const pet = await Pet.create(petData);
    
    // Associar tags se fornecidas
    if (tags && Array.isArray(tags)) {
      await pet.setTags(tags);
    }
    
    res.redirect('/pets');
  } catch (error) {
    const [shelters, allTags] = await Promise.all([
      Shelter.findAll(),
      Tag.findAll({ where: { isActive: true }, order: [['category', 'ASC'], ['name', 'ASC']] })
    ]);
    res.status(400).render('pets/new', {
      title: 'Novo Pet',
      error: error.message,
      data: req.body,
      shelters: shelters.map(shelter => shelter.get({ plain: true })),
      tags: allTags.map(tag => tag.get({ plain: true }))
    });
  }
};

export const edit = async (req, res) => {
  try {
    const [pet, shelters, allTags] = await Promise.all([
      Pet.findByPk(req.params.id, {
        include: [
          { 
            model: Tag, 
            as: 'tags',
            through: { attributes: [] },
            required: false
          }
        ]
      }),
      Shelter.findAll(),
      Tag.findAll({ where: { isActive: true }, order: [['category', 'ASC'], ['name', 'ASC']] })
    ]);
    
    if (!pet) {
      return res.status(404).render('shared/error', {
        error: 'Pet não encontrado'
      });
    }

    const petData = pet.get({ plain: true });
    const selectedTagIds = petData.tags ? petData.tags.map(tag => tag.id) : [];

    res.render('pets/edit', {
      title: 'Editar Pet',
      pet: petData,
      shelters: shelters.map(shelter => shelter.get({ plain: true })),
      tags: allTags.map(tag => ({
        ...tag.get({ plain: true }),
        selected: selectedTagIds.includes(tag.id)
      }))
    });
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) {
      return res.status(404).render('shared/error', { error: 'Pet não encontrado' });
    }
    
    const { tags, ...otherFields } = req.body;
    const petData = pickFields(otherFields, PET_FIELDS);
    await pet.update(petData);
    
    // Atualizar tags se fornecidas
    if (tags !== undefined) {
      const tagIds = Array.isArray(tags) ? tags : [tags];
      await pet.setTags(tagIds.filter(id => id)); // Remove valores vazios
    }
    
    res.redirect('/pets/' + req.params.id);
  } catch (error) {
    res.status(400).render('pets/edit', {
      title: 'Editar Pet',
      pet: { ...req.body, id: req.params.id },
      error: error.message
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) {
      return res.status(404).render('shared/error', { error: 'Pet não encontrado' });
    }
    await pet.destroy();
    res.redirect('/pets');
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};

// Adicionar tag individual a um pet
export const addTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { tagId } = req.body;
    
    const pet = await Pet.findByPk(id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }
    
    const tag = await Tag.findByPk(tagId);
    if (!tag || !tag.isActive) {
      return res.status(404).json({ error: 'Tag não encontrada ou inativa' });
    }
    
    await pet.addTag(tag);
    
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.json({ success: true, message: 'Tag adicionada com sucesso' });
    }
    
    res.redirect(`/pets/${id}?success=Tag adicionada com sucesso`);
  } catch (error) {
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(500).json({ error: error.message });
    }
    res.redirect(`/pets/${req.params.id}?error=${encodeURIComponent(error.message)}`);
  }
};

// Remover tag individual de um pet
export const removeTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { tagId } = req.body;
    
    const pet = await Pet.findByPk(id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }
    
    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      return res.status(404).json({ error: 'Tag não encontrada' });
    }
    
    await pet.removeTag(tag);
    
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.json({ success: true, message: 'Tag removida com sucesso' });
    }
    
    res.redirect(`/pets/${id}?success=Tag removida com sucesso`);
  } catch (error) {
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(500).json({ error: error.message });
    }
    res.redirect(`/pets/${req.params.id}?error=${encodeURIComponent(error.message)}`);
  }
};
