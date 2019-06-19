export const USERS = {
  page: 1,
  limit: 7,
  pages: 4,
  results: 25,
  output: [
    {
      'status': true,
      '_id': '5c8f97c5cece9911f01dd561',
      'name': 'Admin',
      'surname': 'ADMIN',
      'email': 'admin@company.org',
      'role': {
        'public': false,
        'editable': false,
        '_id': '5c8f96bbcece9911f01dd0ab',
        'name': 'Administrator',
        'code': 'ADMIN',
        'description': 'Main System Administrator with full access',
        'active': true, '__v': 0
      },
      'password': '$2a$10$mNoHh1swsVyvIu4IILOoCu5E8FKFynxXHEe5G3GpYA8OjCpGcs3l.',
      'created': '2019-03-18T13:06:13.037Z',
      '__v': 0,
      'branch': '5c8f96b9cece9911f01dd0a0',
      'group': {
        'status': false,
        'permissions': false,
        '_id': '5cade7a578f0a97097c972c5',
        'name': 'TEST',
        'description': 'TEST',
        '__v': 0
      }
    },
    {
      'status': true,
      '_id': '5c8f970dcece9911f01dd223',
      'name': 'Holt',
      'surname': 'Aasaf',
      'email': 'haasaf4q@tamu.edu',
      'created': '2019-03-18T13:03:09.953Z',
      'role': {
        'public': false,
        'editable': false,
        '_id': '5c8f96bbcece9911f01dd0ae',
        'name': 'Support',
        'code': 'SUPPORT',
        'description': 'An employee with full access to all tickets in the system',
        'active': true,
        '__v': 0
      },
      '__v': 0,
      'branch': '5c8f96b9cece9911f01dd0a2',
      'group': {
        'status': true,
        'permissions': true,
        '_id': '5c8f96bacece9911f01dd0a6',
        'name': 'Front-End Pool',
        'description': 'Group of all employees with Front-End expertise',
        '__v': 0
      }
    }
  ]
};
