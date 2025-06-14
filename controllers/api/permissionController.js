import Permission from '../../models/Permission.js';
import Role from '../../models/Role.js';
import { pickFields, PERMISSION_FIELDS } from '../../utils/sanitizer.js';

// Get all permissions
export const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll({
      include: [
        {
          model: Role,
          as: 'roles',
          through: { attributes: [] }
        }
      ]
    });
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get permission by ID
export const getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id, {
      include: [
        {
          model: Role,
          as: 'roles',
          through: { attributes: [] }
        }
      ]
    });
    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    res.json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new permission
export const createPermission = async (req, res) => {
  try {
    const sanitizedData = pickFields(req.body, PERMISSION_FIELDS);
    const permission = await Permission.create(sanitizedData);
    res.status(201).json(permission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update permission
export const updatePermission = async (req, res) => {
  try {
    const sanitizedData = pickFields(req.body, PERMISSION_FIELDS);
    const [updated] = await Permission.update(sanitizedData, {
      where: { id: req.params.id }
    });
    
    if (!updated) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    
    const permission = await Permission.findByPk(req.params.id, {
      include: [
        {
          model: Role,
          as: 'roles',
          through: { attributes: [] }
        }
      ]
    });
    
    res.json(permission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete permission
export const deletePermission = async (req, res) => {
  try {
    const deleted = await Permission.destroy({
      where: { id: req.params.id }
    });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    
    res.json({ message: 'Permission deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get permissions by resource
export const getPermissionsByResource = async (req, res) => {
  try {
    const permissions = await Permission.findAll({
      where: { resource: req.params.resource },
      include: [
        {
          model: Role,
          as: 'roles',
          through: { attributes: [] }
        }
      ]
    });
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get permissions by action
export const getPermissionsByAction = async (req, res) => {
  try {
    const permissions = await Permission.findAll({
      where: { action: req.params.action },
      include: [
        {
          model: Role,
          as: 'roles',
          through: { attributes: [] }
        }
      ]
    });
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};