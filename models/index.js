// Arquivo central para gerenciar models e suas associações
// Seguindo as melhores práticas da documentação do Sequelize

import sequelize from '../config/sequelize.js';

// Importar todos os models
import AdoptionRequest from './AdoptionRequest.js';
import Image from './Image.js';
import Pet from './Pet.js';
import PetTag from './PetTag.js';
import Shelter from './Shelter.js';
import Tag from './Tag.js';
import User from './User.js';

// Objeto com todos os models para facilitar as associações
const models = {
  AdoptionRequest,
  Image,
  Pet,
  PetTag,
  Shelter,
  Tag,
  User
};

// Definir todas as associações entre modelos
// Seguindo a documentação: https://sequelize.org/docs/v6/core-concepts/assocs/

// === USER ASSOCIATIONS ===
// User tem muitos Shelters
User.hasMany(Shelter, { 
  foreignKey: 'userId',
  as: 'shelters'
});

// User tem muitas AdoptionRequests
User.hasMany(AdoptionRequest, { 
  foreignKey: 'userId',
  as: 'adoptionRequests'
});

// User tem muitos PetTags (quem adicionou a tag)
User.hasMany(PetTag, { 
  foreignKey: 'addedBy', 
  as: 'addedPetTags' 
});

// === SHELTER ASSOCIATIONS ===
// Shelter pertence a um User
Shelter.belongsTo(User, { 
  foreignKey: 'userId',
  as: 'user'
});

// Shelter tem muitos Pets
Shelter.hasMany(Pet, { 
  foreignKey: 'shelterId',
  as: 'pets'
});

// === PET ASSOCIATIONS ===
// Pet pertence a um Shelter
Pet.belongsTo(Shelter, { 
  foreignKey: 'shelterId',
  as: 'shelter'
});

// Pet tem muitas Images
Pet.hasMany(Image, { 
  foreignKey: 'petId',
  as: 'images'
});

// Pet tem muitas AdoptionRequests
Pet.hasMany(AdoptionRequest, { 
  foreignKey: 'petId',
  as: 'adoptionRequests'
});

// Pet tem muitas Tags (associação N:N através de PetTag)
Pet.belongsToMany(Tag, { 
  through: PetTag, 
  foreignKey: 'petId',
  otherKey: 'tagId',
  as: 'tags'
});

// Pet tem muitos PetTags (para acesso direto à tabela intermediária)
Pet.hasMany(PetTag, { 
  foreignKey: 'petId',
  as: 'petTags'
});

// === TAG ASSOCIATIONS ===
// Tag tem muitos Pets (associação N:N através de PetTag)
Tag.belongsToMany(Pet, { 
  through: PetTag, 
  foreignKey: 'tagId',
  otherKey: 'petId',
  as: 'pets'
});

// Tag tem muitos PetTags (para acesso direto à tabela intermediária)
Tag.hasMany(PetTag, { 
  foreignKey: 'tagId',
  as: 'petTags'
});

// === IMAGE ASSOCIATIONS ===
// Image pertence a um Pet
Image.belongsTo(Pet, { 
  foreignKey: 'petId',
  as: 'pet'
});

// === ADOPTION REQUEST ASSOCIATIONS ===
// AdoptionRequest pertence a um User
AdoptionRequest.belongsTo(User, { 
  foreignKey: 'userId',
  as: 'user'
});

// AdoptionRequest pertence a um Pet
AdoptionRequest.belongsTo(Pet, { 
  foreignKey: 'petId',
  as: 'pet'
});

// === PET TAG ASSOCIATIONS (Tabela intermediária) ===
// PetTag pertence a um Pet
PetTag.belongsTo(Pet, { 
  foreignKey: 'petId',
  as: 'pet'
});

// PetTag pertence a uma Tag
PetTag.belongsTo(Tag, { 
  foreignKey: 'tagId',
  as: 'tag'
});

// PetTag pertence a um User (quem adicionou)
PetTag.belongsTo(User, { 
  foreignKey: 'addedBy', 
  as: 'addedByUser'
});

// Exportar models e sequelize para uso na aplicação
export {
  AdoptionRequest,
  Image,
  Pet,
  PetTag, sequelize, Shelter,
  Tag,
  User
};

// Export default com todos os models
export default models;
