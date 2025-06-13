import AdoptionRequest from './AdoptionRequest.js';
import Image from './Image.js';
import Pet from './Pet.js';
import PetTag from './PetTag.js';
import Shelter from './Shelter.js';
import Tag from './Tag.js';
import User from './User.js';

// Inicializar todas as associações dos models
export function defineAssociations() {
  const models = {
    AdoptionRequest,
    Image,
    Pet,
    PetTag,
    Shelter,
    Tag,
    User
  };

  // Chamar o método associate de cada model se ele existir
  Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
}

// Exportar todos os models
export {
  AdoptionRequest,
  Image,
  Pet,
  PetTag,
  Shelter,
  Tag,
  User
};

