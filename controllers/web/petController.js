import Pet from '../../models/Pet.js';
import Shelter from '../../models/Shelter.js';

export const index = async (req, res) => {
  try {
    const pets = await Pet.findAll({
      include: [{ model: Shelter, attributes: ['name'] }]
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
      include: [{ model: Shelter, attributes: ['name', 'email', 'phone'] }]
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
    const shelters = await Shelter.findAll();
    res.render('pets/new', {
      title: 'Novo Pet',
      shelters: shelters.map(shelter => shelter.get({ plain: true }))
    });
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};

export const store = async (req, res) => {
  try {
    await Pet.create(req.body);
    res.redirect('/pets');
  } catch (error) {
    const shelters = await Shelter.findAll();
    res.status(400).render('pets/new', {
      title: 'Novo Pet',
      error: error.message,
      data: req.body,
      shelters: shelters.map(shelter => shelter.get({ plain: true }))
    });
  }
};

export const edit = async (req, res) => {
  try {
    const [pet, shelters] = await Promise.all([
      Pet.findByPk(req.params.id),
      Shelter.findAll()
    ]);
    
    if (!pet) {
      return res.status(404).render('shared/error', {
        error: 'Pet não encontrado'
      });
    }

    res.render('pets/edit', {
      title: 'Editar Pet',
      pet: pet.get({ plain: true }),
      shelters: shelters.map(shelter => shelter.get({ plain: true }))
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
    await pet.update(req.body);
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
