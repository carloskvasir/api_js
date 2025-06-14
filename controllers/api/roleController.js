import Permission from '../../models/Permission.js';
import Role from '../../models/Role.js';
import User from '../../models/User.js';
import { pickFields, ROLE_FIELDS } from '../../utils/sanitizer.js';

// Get all roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [
        {
          model: Permission,
          as: 'permissions',
          through: { attributes: [] }
        }
      ]
    });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get role by ID
export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id, {
      include: [
        {
          model: Permission,
          as: 'permissions',
          through: { attributes: [] }
        },
        {
          model: User,
          as: 'users',
          through: { attributes: [] }
        }
      ]
    });
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new role
export const createRole = async (req, res) => {
  try {
    const sanitizedData = pickFields(req.body, ROLE_FIELDS);
    const role = await Role.create(sanitizedData);
    
    // Add permissions if provided
    if (req.body.permissions && req.body.permissions.length > 0) {
      await role.addPermissions(req.body.permissions);
    }
    
    const createdRole = await Role.findByPk(role.id, {
      include: [
        {
          model: Permission,
          as: 'permissions',
          through: { attributes: [] }
        }
      ]
    });
    
    res.status(201).json(createdRole);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update role
export const updateRole = async (req, res) => {
  try {
    const sanitizedData = pickFields(req.body, ROLE_FIELDS);
    const [updated] = await Role.update(sanitizedData, {
      where: { id: req.params.id }
    });
    
    if (!updated) {
      return res.status(404).json({ error: 'Role not found' });
    }
    
    const role = await Role.findByPk(req.params.id, {
      include: [
        {
          model: Permission,
          as: 'permissions',
          through: { attributes: [] }
        }
      ]
    });
    
    // Update permissions if provided
    if (req.body.permissions) {
      await role.setPermissions(req.body.permissions);
    }
    
    res.json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete role
export const deleteRole = async (req, res) => {
  try {
    const deleted = await Role.destroy({
      where: { id: req.params.id }
    });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Role not found' });
    }
    
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add permission to role
export const addPermissionToRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    
    const permission = await Permission.findByPk(req.params.permissionId);
    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    
    await role.addPermission(permission);
    res.json({ message: 'Permission added to role successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove permission from role
export const removePermissionFromRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    
    const permission = await Permission.findByPk(req.params.permissionId);
    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    
    await role.removePermission(permission);
    res.json({ message: 'Permission removed from role successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};