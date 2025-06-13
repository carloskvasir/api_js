import { Shelter } from '../../models/index.js';

export const getAllShelters = async (req, res) => {
  try {
    const shelters = await Shelter.findAll();
    res.json(shelters);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar abrigos', details: error.message });
  }
};

export const getShelterById = async (req, res) => {
  try {
    const { id } = req.params;
    const shelter = await Shelter.findByPk(id);
    
    if (!shelter) {
      return res.status(404).json({ error: 'Abrigo não encontrado' });
    }
    
    res.json(shelter);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar abrigo', details: error.message });
  }
};

export const createShelter = async (req, res) => {
  try {
    const shelterData = req.body;
    const shelter = await Shelter.create(shelterData);
    res.status(201).json({ message: 'Abrigo criado com sucesso', shelter });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Dados inválidos', details: error.errors });
    }
    res.status(500).json({ error: 'Erro ao criar abrigo', details: error.message });
  }
};

export const updateShelter = async (req, res) => {
  try {
    const { id } = req.params;
    const shelterData = req.body;
    
    const shelter = await Shelter.findByPk(id);
    if (!shelter) {
      return res.status(404).json({ error: 'Abrigo não encontrado' });
    }

    await shelter.update(shelterData);
    res.json({ message: 'Abrigo atualizado com sucesso', shelter });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Dados inválidos', details: error.errors });
    }
    res.status(500).json({ error: 'Erro ao atualizar abrigo', details: error.message });
  }
};

export const deleteShelter = async (req, res) => {
  try {
    const { id } = req.params;
    const shelter = await Shelter.findByPk(id);
    
    if (!shelter) {
      return res.status(404).json({ error: 'Abrigo não encontrado' });
    }

    await shelter.destroy();
    res.json({ message: 'Abrigo removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover abrigo', details: error.message });
  }
};
