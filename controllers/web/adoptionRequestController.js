import { AdoptionRequest, Pet, User } from '../../models/index.js';

export const index = async (req, res) => {
  try {
    const adoptionRequests = await AdoptionRequest.findAll({
      include: [
        { 
          model: Pet, 
          as: 'pet',
          attributes: ['name', 'species', 'breed'] 
        },
        { 
          model: User, 
          as: 'user',
          attributes: ['name', 'email'] 
        }
      ]
    });
    const plainRequests = adoptionRequests.map(request => ({
      ...request.get({ plain: true }),
      viewUrl: `/adoptions/${request.id}`,
      editUrl: `/adoptions/${request.id}/edit`,
      deleteUrl: `/adoptions/${request.id}`
    }));
    res.render('adoptions/index', {
      title: 'Solicitações de Adoção',
      adoptionRequests: plainRequests
    });
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};

export const show = async (req, res) => {
  try {
    const adoptionRequest = await AdoptionRequest.findByPk(req.params.id, {
      include: [
        { 
          model: Pet, 
          as: 'pet',
          attributes: ['name', 'species', 'breed'] 
        },
        { 
          model: User, 
          as: 'user',
          attributes: ['name', 'email', 'phone'] 
        }
      ]
    });
    
    if (!adoptionRequest) {
      return res.status(404).render('shared/error', {
        error: 'Solicitação de adoção não encontrada'
      });
    }

    res.render('adoptions/show', {
      title: `Solicitação #${adoptionRequest.id}`,
      adoptionRequest: adoptionRequest.get({ plain: true })
    });
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const [pets, users] = await Promise.all([
      Pet.findAll({ where: { status: 'available' } }),
      User.findAll()
    ]);
    res.render('adoptions/new', {
      title: 'Nova Solicitação de Adoção',
      pets: pets.map(pet => pet.get({ plain: true })),
      users: users.map(user => user.get({ plain: true }))
    });
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};

export const store = async (req, res) => {
  try {
    const adoptionRequest = await AdoptionRequest.create(req.body);
    res.redirect(`/adoptions/${adoptionRequest.id}`);
  } catch (error) {
    const [pets, users] = await Promise.all([
      Pet.findAll({ where: { status: 'available' } }),
      User.findAll()
    ]);
    res.status(400).render('adoptions/new', {
      title: 'Nova Solicitação de Adoção',
      error: error.message,
      data: req.body,
      pets: pets.map(pet => pet.get({ plain: true })),
      users: users.map(user => user.get({ plain: true }))
    });
  }
};

export const edit = async (req, res) => {
  try {
    const [adoptionRequest, pets, users] = await Promise.all([
      AdoptionRequest.findByPk(req.params.id),
      Pet.findAll(),
      User.findAll()
    ]);

    if (!adoptionRequest) {
      return res.status(404).render('shared/error', {
        error: 'Solicitação de adoção não encontrada'
      });
    }

    res.render('adoptions/edit', {
      title: 'Editar Solicitação de Adoção',
      adoptionRequest: adoptionRequest.get({ plain: true }),
      pets: pets.map(pet => pet.get({ plain: true })),
      users: users.map(user => user.get({ plain: true }))
    });
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const adoptionRequest = await AdoptionRequest.findByPk(req.params.id);
    if (!adoptionRequest) {
      return res.status(404).render('shared/error', {
        error: 'Solicitação de adoção não encontrada'
      });
    }
    await adoptionRequest.update(req.body);
    res.redirect(`/adoptions/${adoptionRequest.id}`);
  } catch (error) {
    res.status(400).render('adoptions/edit', {
      title: 'Editar Solicitação de Adoção',
      adoptionRequest: { ...req.body, id: req.params.id },
      error: error.message
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const adoptionRequest = await AdoptionRequest.findByPk(req.params.id);
    if (!adoptionRequest) {
      return res.status(404).render('shared/error', {
        error: 'Solicitação de adoção não encontrada'
      });
    }
    await adoptionRequest.destroy();
    res.redirect('/adoptions');
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};
