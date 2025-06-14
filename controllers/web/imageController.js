import { Image, Pet } from '../../models/index.js';
import { pickFields, IMAGE_FIELDS } from '../../utils/sanitizer.js';

// Função helper para validar texto
const validateText = (text) => {
  if (!text || !text.trim()) {
    throw new Error('Por favor, forneça um texto');
  }

  return text.trim();
};

export const index = async (req, res) => {
  try {
    const images = await Image.findAll({
      include: [{ 
        model: Pet, 
        as: 'pet',
        attributes: ['name'] 
      }]
    });
    const plainImages = images.map(image => {
      const plainImage = image.get({ plain: true });
      
      return {
        ...plainImage,
        displayUrl: plainImage.url, // Sempre usar URL (externa ou local)
        viewUrl: `/images/${image.id}`,
        editUrl: `/images/${image.id}/edit`,
        deleteUrl: `/images/${image.id}`
      };
    });
    
    res.render('images/index', {
      title: 'Imagens',
      images: plainImages
    });
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};

export const show = async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id, {
      include: [{ 
        model: Pet, 
        as: 'pet',
        attributes: ['name', 'id'] 
      }]
    });
    
    if (!image) {
      return res.status(404).render('shared/error', { error: 'Imagem não encontrada' });
    }

    const plainImage = image.get({ plain: true });

    res.render('images/show', {
      title: 'Detalhes da Imagem',
      image: {
        ...plainImage,
        displayUrl: plainImage.url // Sempre usar URL (externa ou local)
      }
    });
  } catch (error) {
    console.error('Error in show image:', error);
    res.status(500).render('shared/error', { error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const pets = await Pet.findAll();
    res.render('images/new', {
      title: 'Nova Imagem',
      pets: pets.map(pet => pet.get({ plain: true }))
    });
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};

export const store = async (req, res) => {
  try {
    console.log('Store - Starting request processing');
    console.log('Store - Request body:', req.body);

    // Validate petId before picking fields
    const { petId } = req.body;
    if (!petId) {
      throw new Error('Por favor, selecione um pet');
    }

    const sanitizedData = pickFields(req.body, IMAGE_FIELDS);

    // Ensure url is validated if it's part of IMAGE_FIELDS and present
    if (sanitizedData.url) {
      sanitizedData.url = validateText(sanitizedData.url);
    }

    const image = await Image.create(sanitizedData);
    console.log('Store - Image with URL created successfully:', image.id);
    res.redirect(`/pets/${petId}`);
  } catch (error) {
    console.error('Store - Error:', error);
    const pets = await Pet.findAll();
    res.status(400).render('images/new', {
      layout: 'main',
      title: 'Nova Imagem',
      error: error.message,
      data: req.body,
      pets: pets.map(pet => pet.get({ plain: true }))
    });
  }
};

export const edit = async (req, res) => {
  try {
    const [image, pets] = await Promise.all([
      Image.findByPk(req.params.id, {
        include: [{ 
          model: Pet, 
          as: 'pet',
          attributes: ['name'] 
        }]
      }),
      Pet.findAll()
    ]);
    
    if (!image) {
      return res.status(404).render('shared/error', { error: 'Imagem não encontrada' });
    }

    res.render('images/edit', {
      title: 'Editar Imagem',
      image: image.get({ plain: true }),
      pets: pets.map(pet => pet.get({ plain: true }))
    });
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    console.log('Update - Starting request processing');
    console.log('Update - Request body:', req.body);

    const image = await Image.findByPk(req.params.id);
    if (!image) {
      return res.status(404).render('shared/error', { error: 'Imagem não encontrada' });
    }

    const sanitizedData = pickFields(req.body, IMAGE_FIELDS);

    // Ensure url is validated if it's part of IMAGE_FIELDS and present
    if (sanitizedData.url) {
      sanitizedData.url = validateText(sanitizedData.url);
    }

    await image.update(sanitizedData);
    console.log('Update - Image with URL updated successfully:', image.id);
    res.redirect(`/images/${image.id}`);
  } catch (error) {
    const pets = await Pet.findAll();
    res.status(400).render('images/edit', {
      title: 'Editar Imagem',
      image: { ...req.body, id: req.params.id },
      pets: pets.map(pet => pet.get({ plain: true })),
      error: error.message
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);
    if (!image) {
      return res.status(404).render('shared/error', { error: 'Imagem não encontrada' });
    }

    // Deletar apenas o registro da imagem (sem upload de arquivo)
    await image.destroy();
    
    res.redirect('/images');
  } catch (error) {
    res.status(500).render('shared/error', { error: error.message });
  }
};
