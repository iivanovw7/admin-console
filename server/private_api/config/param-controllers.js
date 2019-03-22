//roles available for authentication
export const authRoles = [
  'ADMIN',
  'SUPPORT',
  'MANAGER',
  'BRANCH_ADMIN',
  'BRANCH_SUPPORT'
];

//List of groups, which cannot be deleted and/or deactivated
export const defaultGroups = [
  'Other'
];

//access to messages for different types of roles --------------
export const fullAccess = [
  'ADMIN',
  'SUPPORT'
];

export const branchAccess = [
  'BRANCH_SUPPORT',
  'BRANCH_ADMIN'
];

export const groupAccess = [
  'MANAGER'
];
//--------------------------------------------------------------

//Lists of roles, which cannot be deleted and/or deactivated
export const defaultRoles = [
  'ADMIN',
  'USER',
  'SUPPORT',
  'MANAGER',
  'BRANCH_ADMIN',
  'BRANCH_SUPPORT'
];
//Lists of roles, which cannot be deleted and/or deactivated
export const mainRoles = [
  'ADMIN',
  'USER'
];

/**
 * Lists of tickets statuses, used in controller to confirm status field,
 * if status passed in params differs from defaultStatus - default status will be applied
 * Lowercase letters are used here because the same letters are used in database model
 */
export const defaultStatuses = [
  'Opened',
  'In progress',
  'Closed',
  'Reopened',
  'Cannot be done'
];


/**
 * List of statuses for statistics controller, used to apply search queries dynamically
 * in order to perform search according to current ticket status field.
 * Lowercase letters are used here because the same letters are used in database model
 *
 */
export const defaultStatusModels = {
  open: 'Opened',
  progress: 'In progress',
  closed: 'Closed',
  reopened: 'Reopened',
  cannot_be_done: 'Cannot be done'
};

