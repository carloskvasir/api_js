// Arquivo central para gerenciar models e suas associações
// Seguindo as melhores práticas da documentação do Sequelize

import sequelize from '../config/sequelize.js';

// Importar todos os models
import AdoptionRequest from './AdoptionRequest.js';
import Image from './Image.js';
import Permission from './Permission.js';
import Pet from './Pet.js';
import PetTag from './PetTag.js';
import Role from './Role.js';
import RolePermission from './RolePermission.js';
import Shelter from './Shelter.js';
import Tag from './Tag.js';
import User from './User.js';
import UserRole from './UserRole.js';

// Objeto com todos os models para facilitar as associações
const models = {
  AdoptionRequest,
  Image,
  Pet,
  PetTag,
  Role,
  Permission,
  UserRole,
  RolePermission,
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

// User tem muitos UserRoles (associação N:N através de UserRole)
User.belongsToMany(Role, { 
  through: UserRole, 
  foreignKey: 'user_id',
  otherKey: 'role_id',
  as: 'roles'
});

// User tem muitos UserRoles (para acesso direto à tabela intermediária)
User.hasMany(UserRole, { 
  foreignKey: 'user_id',
  as: 'userRoles'
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

// === ROLE ASSOCIATIONS ===
// Role tem muitos Users (associação N:N através de UserRole)
Role.belongsToMany(User, { 
  through: UserRole, 
  foreignKey: 'role_id',
  otherKey: 'user_id',
  as: 'users'
});

// Role tem muitos UserRoles (para acesso direto à tabela intermediária)
Role.hasMany(UserRole, { 
  foreignKey: 'role_id',
  as: 'userRoles'
});

// Role tem muitas Permissions (associação N:N através de RolePermission)
Role.belongsToMany(Permission, { 
  through: RolePermission, 
  foreignKey: 'role_id',
  otherKey: 'permission_id',
  as: 'permissions'
});

// Role tem muitos RolePermissions (para acesso direto à tabela intermediária)
Role.hasMany(RolePermission, { 
  foreignKey: 'role_id',
  as: 'rolePermissions'
});

// === PERMISSION ASSOCIATIONS ===
// Permission tem muitos Roles (associação N:N através de RolePermission)
Permission.belongsToMany(Role, { 
  through: RolePermission, 
  foreignKey: 'permission_id',
  otherKey: 'role_id',
  as: 'roles'
});

// Permission tem muitos RolePermissions (para acesso direto à tabela intermediária)
Permission.hasMany(RolePermission, { 
  foreignKey: 'permission_id',
  as: 'rolePermissions'
});

// === USER ROLE ASSOCIATIONS (Tabela intermediária) ===
// UserRole pertence a um User
UserRole.belongsTo(User, { 
  foreignKey: 'user_id',
  as: 'user'
});

// UserRole pertence a um Role
UserRole.belongsTo(Role, { 
  foreignKey: 'role_id',
  as: 'role'
});

// === ROLE PERMISSION ASSOCIATIONS (Tabela intermediária) ===
// RolePermission pertence a um Role
RolePermission.belongsTo(Role, { 
  foreignKey: 'role_id',
  as: 'role'
});

// RolePermission pertence a uma Permission
RolePermission.belongsTo(Permission, { 
  foreignKey: 'permission_id',
  as: 'permission'
});

// Exportar models e sequelize para uso na aplicação
export {
  AdoptionRequest,
  Image, Permission, Pet,
  PetTag, Role,
  RolePermission,
  sequelize,
  Shelter,
  Tag,
  User,
  UserRole
};

// Export default com todos os models
export default models;
