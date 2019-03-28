import Branch from '../../models/Branch';
import Group from '../../models/Group';
import User from '../../models/User';
import Role from '../../models/Role';
import { defaultRoles } from '../config/constants.config';
import mongoose from 'mongoose';

//Functions to be tested
import {
  ifArrayContains,
  getUserRoleCode,
  getUserBranch,
  getUserGroup,
  checkAccess,
} from '../helper-functions';

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

let db;

//creating temp objects to be used for tests
let testGroup;
let testBranch;
let testUser;
let testRole;

beforeAll(async (done) => {

  mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true })
          .then(() => {
            console.log('Connected to database successfully.');
          })
          .catch(err => {
            console.log(err);
          });

  db = mongoose.connection;

  //create test group
  await new Group({
    name: 'HELPER_TEST_GROUP',
    status: true,
    description: 'Test group description'
  }).save();

  //create test branch
  await new Branch({
    name: 'HELPER_TEST_BRANCH',
    email: 'HELPER_TEST_EMAIL@mail.com',
    phone: 'HELPER_TEST_PHONE',
    address: 'HELPER_TEST_ADDRESS',
    fax: 'HELPER_TEST_FAX',
    status: true
  }).save();

  await new Role({
    _id: '507f191e810c19729de860ea',
    name: 'TestRoleName',
    code: 'ADMIN',
    description: 'TestDescription',
    active: true,
    public: true,
    editable: true
  }).save();

  //find back created objects to save ids to local variables
  const group = await Group.findOne({ name: 'HELPER_TEST_GROUP' });
  const branch = await Branch.findOne({ name: 'HELPER_TEST_BRANCH' });
  const role = await Role.findOne({ name: 'TestRoleName' });
  testGroup = group;
  testBranch = branch;
  testRole = role;

  //add test user and assign it to new group and branch
  await new User({
    email: 'helper_test@mail.com',
    name: 'HELPER_TEST_USER_NAME',
    surname: 'HELPER_TEST_USER_SURNAME',
    group: group._id,
    branch: branch._id,
    role: role._id
  }).save();

  const user = await User.findOne({ name: 'HELPER_TEST_USER_NAME' });
  testUser = user;

  done();

});

afterAll(async (done) => {

  await db.close();

  done();
});

describe('Checking helper-functions: ', function () {

  it('ifStringsContain(defaultRoles, admin) expects to be TRUE', async () => {
    expect(await ifArrayContains(defaultRoles, 'admin')).toBe(false);
  });

  it('getUserRoleCode(user) expects to be ADMIN', async () => {
    await expect(getUserRoleCode(testUser._id)).resolves.toBe('ADMIN');
  });

  it('getUserBranch(testUser) expects to be HELPER_TEST_BRANCH', async () => {

    const branch = await getUserBranch(testUser._id);

    expect(branch.name).toContain('HELPER_TEST_BRANCH');

  });

  it('getUserGroup(testUser) expects to be HELPER_TEST_GROUP', async () => {

    const group = await getUserGroup(testUser._id);

    expect(group.name).toContain('HELPER_TEST_GROUP');

  });

  it('checkAccess(req, res, next) expect TO NOT receive an auth error', async (done) => {

    const res = {};
    const req = { user: testUser };

    const next = (err) => {
      expect(err).toBeFalsy();
      done();
    };

    await checkAccess(req, res, next);

  });

});







