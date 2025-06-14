// Utility functions for sanitizing input data
// Remove system-generated fields that should not be set by users

/**
 * Remove system fields from request data
 * @param {Object} data - Request body data
 * @param {Array} additionalFields - Additional fields to remove
 * @returns {Object} Sanitized data without system fields
 */
export const sanitizeData = (data, additionalFields = []) => {
  const systemFields = [
    'id',
    'createdAt', 
    'created_at',
    'updatedAt',
    'updated_at',
    ...additionalFields
  ];
  
  const sanitized = { ...data };
  
  systemFields.forEach(field => {
    delete sanitized[field];
  });
  
  return sanitized;
};

/**
 * Pick only allowed fields from request data
 * @param {Object} data - Request body data
 * @param {Array} allowedFields - Array of allowed field names
 * @returns {Object} Object with only allowed fields
 */
export const pickFields = (data, allowedFields) => {
  const picked = {};
  
  allowedFields.forEach(field => {
    if (data.hasOwnProperty(field)) {
      picked[field] = data[field];
    }
  });
  
  return picked;
};

/**
 * User allowed fields for create/update operations
 */
export const USER_FIELDS = ['name', 'email', 'phone', 'password'];

/**
 * Pet allowed fields for create/update operations
 */
export const PET_FIELDS = ['name', 'species', 'breed', 'age', 'description', 'status', 'shelterId'];

/**
 * Shelter allowed fields for create/update operations
 */
export const SHELTER_FIELDS = ['name', 'address', 'phone', 'email', 'description', 'userId'];

/**
 * Tag allowed fields for create/update operations
 */
export const TAG_FIELDS = ['name', 'description', 'color', 'category'];

/**
 * Role allowed fields for create/update operations
 */
export const ROLE_FIELDS = ['name', 'description'];

/**
 * Permission allowed fields for create/update operations
 */
export const PERMISSION_FIELDS = ['name', 'description', 'resource', 'action'];

/**
 * AdoptionRequest allowed fields for create/update operations
 */
export const ADOPTION_REQUEST_FIELDS = ['petId', 'userId', 'status', 'note'];

/**
 * Image allowed fields for create/update operations
 */
export const IMAGE_FIELDS = ['petId', 'url'];
