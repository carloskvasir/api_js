import { Pet, Shelter } from '../../models/index.js';
import { PET_FIELDS, pickFields } from '../../utils/sanitizer.js';

export const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.findAll({
      include: [{ 
        model: Shelter, 
        as: 'shelter',
        attributes: ['name', 'email'] 
      }]
    });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id, {
      include: [{ 
        model: Shelter, 
        as: 'shelter',
        attributes: ['name', 'email', 'phone'] 
      }]
    });
    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPet = async (req, res) => {
  try {
    const sanitizedData = pickFields(req.body, PET_FIELDS);
    const pet = await Pet.create(sanitizedData);
    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }
    const sanitizedData = pickFields(req.body, PET_FIELDS);
    await pet.update(sanitizedData);
    res.json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }
    await pet.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
