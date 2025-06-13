import { Shelter, User } from '../../models/index.js';

export const index = async (req, res) => {
  try {
    const shelters = await Shelter.findAll({
      include: [{ 
        model: User, 
        as: 'user',
        attributes: ['name', 'email'] 
      }]
    });
    const plainShelters = shelters.map(shelter => ({
      ...shelter.get({ plain: true }),
      viewUrl: `/shelters/${shelter.id}`,
      editUrl: `/shelters/${shelter.id}/edit`,
      deleteUrl: `/shelters/${shelter.id}`
    }));
    res.render('shelters/index', {
      title: 'Abrigos',
      shelters: plainShelters
    });
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};

export const show = async (req, res) => {
  try {
    const shelter = await Shelter.findByPk(req.params.id, {
      include: [{ 
        model: User, 
        as: 'user',
        attributes: ['name', 'email'] 
      }]
    });
    
    if (!shelter) {
      return res.status(404).render('shared/error', {
        layout: 'main',
        title: 'Erro',
        error: 'Abrigo não encontrado'
      });
    }

    const plainShelter = {
      ...shelter.get({ plain: true }),
      editUrl: `/shelters/${shelter.id}/edit`,
      deleteUrl: `/shelters/${shelter.id}`,
      backUrl: '/shelters'  // Added back URL for better navigation
    };

    res.render('shelters/show', {
      layout: 'main',
      title: plainShelter.name,
      shelter: plainShelter
    });
  } catch (error) {
    res.status(500).render('shared/error', {
      layout: 'main',
      title: 'Erro',
      error: 'Erro ao buscar dados do abrigo: ' + error.message
    });
  }
};

export const create = async (req, res) => {
  try {
    const users = await User.findAll();
    res.render('shelters/new', {
      layout: 'main',
      title: 'Novo Abrigo',
      users: users.map(user => user.get({ plain: true }))
    });
  } catch (error) {
    res.render('error', {
      layout: 'main',
      title: 'Erro',
      error: error.message
    });
  }
};

export const store = async (req, res) => {
  try {
    const { name, address, phone, email, userId } = req.body;
    if (!name || !address || !phone || !email || !userId) {
      throw new Error('Campos obrigatórios: nome, endereço, telefone, email e responsável');
    }

    await Shelter.create({
      name,
      address, 
      phone,
      email,
      userId,
      description: req.body.description
    });
    res.redirect('/shelters');
  } catch (error) {
    const users = await User.findAll();
    res.status(400).render('shelters/new', {
      layout: 'main',
      title: 'Novo Abrigo',
      error: error.message,
      data: req.body,
      users: users.map(user => user.get({ plain: true }))
    });
  }
};

export const edit = async (req, res) => {
  try {
    const [shelter, users] = await Promise.all([
      Shelter.findByPk(req.params.id),
      User.findAll()
    ]);
    
    if (!shelter) {
      return res.render('error', {
        layout: 'main',
        title: 'Erro',
        error: 'Abrigo não encontrado'
      });
    }

    const plainShelter = shelter.get({ plain: true });
    res.render('shelters/edit', {
      layout: 'main',
      title: 'Editar Abrigo',
      shelter: plainShelter,
      users: users.map(user => user.get({ plain: true })),
      formAction: `/shelters/${shelter.id}?_method=PUT`
    });
  } catch (error) {
    res.render('error', {
      layout: 'main',
      title: 'Erro',
      error: error.message
    });
  }
};

export const update = async (req, res) => {
  try {
    const shelter = await Shelter.findByPk(req.params.id);
    if (!shelter) {
      return res.status(404).render('shared/error', { error: 'Abrigo não encontrado' });
    }
    await shelter.update(req.body);
    res.redirect('/shelters/' + req.params.id);
  } catch (error) {
    res.status(400).render('shelters/edit', {
      title: 'Editar Abrigo2',
      shelter: { ...req.body, id: req.params.id },
      error: error.message
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const shelter = await Shelter.findByPk(req.params.id);
    if (!shelter) {
      return res.status(404).render('shared/error', { error: 'Abrigo não encontrado' });
    }
    await shelter.destroy();
    res.redirect('/shelters');
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};
