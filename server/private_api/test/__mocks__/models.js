const testGroup = {
  name: 'HELPER_TEST_GROUP',
  status: true,
  description: 'Test group description'
};

const otherGroup = {
  name: 'Other',
  status: true,
  description: 'Other group'
};

const testBranch = {
  _id: '507f1f77bcf86cd799439012',
  name: 'HELPER_TEST_BRANCH',
  email: 'HELPER_TEST_EMAIL@mail.com',
  phone: 'HELPER_TEST_PHONE',
  address: 'HELPER_TEST_ADDRESS',
  fax: 'HELPER_TEST_FAX',
  status: true
};

const testRole = {
  _id: '507f1f77bcf86cd799439011',
  name: 'TestRoleName',
  code: 'ADMIN',
  description: 'TestDescription',
  active: true,
  public: true,
  editable: true
};

const tempRole = {
  _id: '507f1f77bcf86cd799439015',
  name: 'TempRoleName',
  code: 'TEMP',
  description: 'TestDescription',
  active: true,
  public: true,
  editable: true
};

const userRole = {
  _id: '507f1f77bcf86cd799439018',
  name: 'UserRoleName',
  code: 'USER',
  description: 'TestDescription',
  active: true,
  public: true,
  editable: true
};

export { testGroup, otherGroup, testBranch, testRole, tempRole, userRole };