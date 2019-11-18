import bcrypt from 'bcryptjs';
import * as models from './__mocks__/models.js';
import request from 'supertest';
import Branch from '../../models/Branch';
import Group from '../../models/Group';
import Role from '../../models/Role';
import User from '../../models/User';
import { app } from '../app';
import mongoose from 'mongoose';
import { docsRoutes } from '../config/constants.config';

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

let db;

//cookie for passport js strategy
let cookie;

//creating temp objects to be used for tests
let testGroup;
let tempGroup;
let testBranch;
let testUser;
let testRole;
let tempRole;
let userRole;

const removeData = async () => {
  const cleanUsers = User.deleteMany({}); //removing user object used for testing
  const cleanGroups = Group.deleteMany({}); //removing group object used for testing
  const cleanBranch = Branch.deleteMany({}); //removing branch object used for testing
  const cleanRoles = Role.deleteMany({}); //removing role object used for testing

  await Promise.all([cleanUsers, cleanGroups, cleanBranch, cleanRoles]);
};

beforeAll(async (done) => {

  await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useUnifiedTopology: true })
                .then(() => {
                  console.log('Connected to database successfully.');
                })
                .catch(err => {
                  console.log(err);
                });

  db = mongoose.connection;

  await removeData().catch(e => {
    console.log(e);
  });

  await new Group(models.testGroup).save(); //create test group
  await new Group(models.otherGroup).save(); //create default group needed for future testing
  await new Branch(models.testBranch).save(); //create test branch
  await new Role(models.testRole).save(); //create test role
  await new Role(models.tempRole).save(); //create one more role to test DELETE rout
  await new Role(models.userRole).save(); //create USER role

  //find back created objects to save ids to local variables
  testGroup = await Group.findOne({ name: 'HELPER_TEST_GROUP' });
  testBranch = await Branch.findOne({ name: 'HELPER_TEST_BRANCH' });
  testRole = await Role.findOne({ name: 'TestRoleName' });
  tempRole = await Role.findOne({ name: 'TempRoleName' });
  userRole = await Role.findOne({ name: 'UserRoleName' });
  tempGroup = await Group.findOne({ name: 'Other' });

  //add test user and assign it to new group and branch
  await new User({
    _id: '507f191e810c19729de860ea',
    email: 'admin@company.org',
    name: 'HELPER_TEST_USER_NAME',
    surname: 'HELPER_TEST_USER_SURNAME',
    group: testGroup._id,
    branch: testBranch._id,
    role: testRole._id,
    password: bcrypt.hashSync('admin', 10)
  }).save();

  testUser = await User.findOne({ email: 'admin@company.org' });

  done();

});

afterAll(async (done) => {

  await removeData().catch(e => {
    console.log(e);
  });

  await db.close();

  done();
});



/**
 * Testing routes.
 * In order to run test global process.env variables should be configured in .env file
 * Admin email and password are used for testing.
 */
describe('Verifying AUTH routes.', () => {

  it('Checking LOGOUT route, expect code 200', async (done) => {
    request(app)
      .get('/api/auth/logout')
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.text).toMatch('OK');
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking LOGIN route, expect code 200', async (done) => {
    request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({ email: 'admin@company.org' })
      .send({ password: 'admin' })
      .then((response) => {
        cookie = response.headers['set-cookie'];
        expect(response).not.toBeNull();
        expect(response.body.name).toMatch('HELPER_TEST_USER_NAME');
        expect(response.statusCode).toBe(200);
        done();
      });
  });

});

describe('Verifying BRANCH routes.', () => {

  it('Checking - GET /api/branches/ route, expect code 200 and valid data', async (done) => {
    request(app)
      .get('/api/branches')
      .set('cookie', cookie)
      .set('user', testUser._id)
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - POST /api/branches/ route, expect code 201', async (done) => {
    request(app)
      .post('/api/branches')
      .set('cookie', cookie)
      .set('user', testUser._id)
      .send({ name: 'SecondTestBranch' })
      .send({ email: 'SecondTestBranch@mail.com' })
      .send({ phone: 'SecondTestBranch_PHONE' })
      .send({ address: 'SecondTestBranch_ADDRESS' })
      .send({ fax: 'SecondTestBranch_FAX' })
      .send({ information: 'SecondTestBranch_INFORMATION' })
      .send({ status: false })
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(201);
        done();
      });
  });

  it('Checking - GET /api/branches/:id route, expect code 200 and valid data', async (done) => {
    request(app)
      .get(`/api/branches/${testBranch._id}`)
      .set('cookie', cookie)
      .set('user', testUser._id)
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.email).toMatch('HELPER_TEST_EMAIL@mail.com');
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - PUT /api/branches/:id route, expect code 200 and valid data', async (done) => {
    request(app)
      .put(`/api/branches/${testBranch._id}`)
      .set('cookie', cookie)
      .set('user', testUser._id)
      .send({ name: 'PutSecondTestBranch' })
      .send({ email: 'PutSecondTestBranch@mail.com' })
      .send({ phone: 'PutSecondTestBranch_PHONE' })
      .send({ address: 'PutSecondTestBranch_ADDRESS' })
      .send({ fax: 'PutSecondTestBranch_FAX' })
      .send({ information: 'PutSecondTestBranch_INFORMATION' })
      .send({ status: true })
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.email).toMatch('PutSecondTestBranch@mail.com');
        expect(response.statusCode).toBe(200);
        done();
      });
  });

});

describe('Verifying ROLE routes.', () => {

  it('Checking - GET /api/roles/ route, expect code 200 and valid data', async (done) => {
    request(app)
      .get('/api/roles')
      .set('cookie', cookie)
      .set('user', testUser._id)
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - POST /api/roles/ route, expect code 201', async (done) => {
    request(app)
      .post('/api/roles')
      .set('cookie', cookie)
      .set('user', testUser._id)
      .send({ name: 'SecondTestRole' })
      .send({ code: 'POST' })
      .send({ description: 'SecondTestRole_DESCRIPTION' })
      .send({ active: true })
      .send({ public: true })
      .send({ editable: true })
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.name).toMatch('SecondTestRole');
        expect(response.statusCode).toBe(201);
        done();
      });
  });

  it('Checking - GET /api/roles/:id route, expect code 200 and valid data', async (done) => {
    request(app)
      .get(`/api/roles/${testRole._id}`)
      .set('cookie', cookie)
      .set('user', testUser._id)
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.name).toMatch('TestRoleName');
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - PUT /api/roles/:id route, expect code 200 and valid data', async (done) => {
    request(app)
      .put(`/api/roles/${testRole._id}`)
      .set('cookie', cookie)
      .set('user', testUser._id)
      .send({ description: 'PutSecondTestBranchCHANGED' })
      .send({ active: true })
      .send({ public: false })
      .send({ editable: false })
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.newRole.description).toMatch('PutSecondTestBranchCHANGED');
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - DELETE /api/roles/:id route, expect code 200', async (done) => {
    request(app)
      .delete(`/api/roles/${tempRole._id}`)
      .set('cookie', cookie)
      .set('user', testUser._id)
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        done();
      });
  });

});

describe('Verifying USER routes.', () => {

  it('Checking - GET /api/users/ route, expect code 200 and valid data', async (done) => {
    request(app)
      .get('/api/users')
      .set('cookie', cookie)
      .set('user', testUser._id)
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - GET /api/users/:id route, expect code 200 and valid data', async (done) => {
    request(app)
      .get(`/api/users/${testUser._id}`)
      .set('cookie', cookie)
      .set('user', testUser._id)
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.name).toMatch('HELPER_TEST_USER_NAME');
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - GET /api/users/search route, expect code 200 and valid data', async (done) => {
    request(app)
      .get(`/api/users/search`)
      .set('cookie', cookie)
      .query({ search: 'HELPER_TEST_USER_NAME' })
      .query({ page: 1 })
      .query({ limit: 10 })
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.output[0].name).toMatch('HELPER_TEST_USER_NAME');
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - GET /api/users/:id route, expect 200 and valid data', async (done) => {
    request(app)
      .get(`/api/users/${testUser._id}`)
      .set('cookie', cookie)
      .set('user', testUser._id)
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.name).toMatch('HELPER_TEST_USER_NAME');
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - PUT /api/users/:id route, expect code 200 and valid data', async (done) => {
    request(app)
      .put(`/api/users/${testUser._id}`)
      .set('cookie', cookie)
      .set('user', testUser._id)
      .send({ group: testGroup._id })
      .send({ branch: testBranch._id })
      .send({ role: testRole._id })
      .send({ status: true })
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.name).toMatch('HELPER_TEST_USER_NAME');
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - GET /api/users/history/:id route, expect code 200 and valid data', async (done) => {
    request(app)
      .get(`/api/users/history/${testUser._id}`)
      .set('cookie', cookie)
      .set('user', testUser._id)
      .query({ months: 12 })
      .query({ page: 1 })
      .query({ limit: 10 })
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.output[0].actionAuthor).toMatch(testUser._id.toString());
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - GET /api/users/branch/:id route, expect code 200 and valid data', async (done) => {
    request(app)
      .get(`/api/users/branch/${testBranch._id}`)
      .set('cookie', cookie)
      .query({ page: 1 })
      .query({ limit: 10 })
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.output[0]._id).toMatch(testUser._id.toString());
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - GET /api/users/group/:id route, expect code 200 and valid data', async (done) => {
    request(app)
      .get(`/api/users/group/${testGroup._id}`)
      .set('cookie', cookie)
      .query({ months: 12 })
      .query({ page: 1 })
      .query({ limit: 10 })
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.output[0]._id).toMatch(testUser._id.toString());
        expect(response.statusCode).toBe(200);
        done();
      });
  });

});

describe('Verifying TICKET routes.', () => {

  let newTicketId; //add test ticket and store Id for future tests

  it('Checking - POST /api/tickets/ route, expect code 201', async (done) => {
    request(app)
      .post('/api/tickets')
      .set('cookie', cookie)
      .set('user', testUser._id)
      .send({ author: testUser._id })
      .send({ branch: testBranch._id })
      .send({ status: 'Opened' })
      .send({ subject: 'Subject' })
      .send({ message: 'message' })
      .send({ note: 'note' })
      .then((response) => {
        newTicketId = response.body._id;
        expect(response).not.toBeNull();
        expect(response.body.subject).toMatch('Subject');
        expect(response.body.branchId).toMatch(testBranch._id.toString());
        expect(response.statusCode).toBe(201);
        done();
      });
  });

  it('Checking - GET /api/tickets/ route, expect code 200 and valid data', async (done) => {
    request(app)
      .get('/api/tickets')
      .set('cookie', cookie)
      .set('user', testUser._id)
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        expect(response.body.output[0]._id).toMatch(newTicketId.toString());
        done();
      });
  });

  it('Checking - GET /api/tickets/:id route, expect code 200 and valid data', async (done) => {
    request(app)
      .get(`/api/tickets/${newTicketId}`)
      .set('cookie', cookie)
      .set('user', testUser._id)
      .set('page', 1)
      .set('limit', 10)
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body._id).toMatch(newTicketId);
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - GET /api/tickets/search route, expect code 200 and valid data', async (done) => {
    request(app)
      .get(`/api/tickets/search`)
      .set('cookie', cookie)
      .query({ search: 'Subject' })
      .query({ page: 1 })
      .query({ limit: 10 })
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.output[0].subject).toMatch('Subject');
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - PUT /api/tickets/:id route, expect code 200 and valid data', async (done) => {
    request(app)
      .put(`/api/tickets/${newTicketId}`)
      .set('cookie', cookie)
      .set('user', testUser._id)
      .send({ status: 'Closed' })
      .send({ note: 'Changed' })
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.status).toMatch('Closed');
        expect(response.body.note).toMatch('Changed');
        expect(response.statusCode).toBe(200);
        done();
      });
  });

});

describe('Verifying GROUP routes.', () => {

  let newGroupId; //add test group and store Id for future tests

  it('Checking - GET /api/groups/ route, expect code 200 and valid data', async (done) => {
    request(app)
      .get('/api/groups')
      .set('cookie', cookie)
      .set('user', testUser._id)
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        expect(response.body.output[0]._id).toMatch(testGroup._id.toString());
        done();
      });
  });

  it('Checking - POST /api/groups/ route, expect code 201', async (done) => {
    request(app)
      .post('/api/groups')
      .set('cookie', cookie)
      .set('user', testUser._id)
      .send({ name: 'NEW' })
      .send({ description: 'Description' })
      .send({ status: true })
      .send({ permissions: true })
      .then((response) => {
        newGroupId = response.body._id;
        expect(response).not.toBeNull();
        expect(response.body.name).toMatch('NEW');
        expect(response.body.description).toMatch('Description');
        expect(response.statusCode).toBe(201);
        done();
      });
  });

  it('Checking - GET /api/groups/:id route, expect code 200 and valid data', async (done) => {
    request(app)
      .get(`/api/groups/${testGroup._id}`)
      .set('cookie', cookie)
      .set('user', testUser._id)
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body._id).toMatch(testGroup._id.toString());
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - PUT /api/groups/:id route, expect code 200 and valid data', async (done) => {
    request(app)
      .put(`/api/groups/${newGroupId}`)
      .set('cookie', cookie)
      .set('user', testUser._id)
      .send({ name: 'NEW_NAME' })
      .send({ description: 'NEW_DESCRIPTION' })
      .send({ permissions: true })
      .send({ status: true })
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.name).toMatch('NEW_NAME');
        expect(response.body.description).toMatch('NEW_DESCRIPTION');
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - DELETE /api/groups/:id route, expect code 200', async (done) => {
    request(app)
      .delete(`/api/groups/${newGroupId}`)
      .set('cookie', cookie)
      .set('user', testUser._id)
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        done();
      });
  });

});

describe('Verifying MESSAGES routes.', () => {

  let newMessageId; //add new message and store id for future tests

  it('Checking - POST /api/messages/new route, expect code 201', async (done) => {
    request(app)
      .post('/api/messages/new')
      .set('cookie', cookie)
      .send({ branchId: testBranch._id })
      .send({ groupId: testGroup._id })
      .send({ subject: 'NEW' })
      .send({ message: 'Message' })
      .then((response) => {
        newMessageId = response.body._id;
        expect(response).not.toBeNull();
        expect(response.body.subject).toMatch('NEW');
        expect(response.body.message).toMatch('Message');
        expect(response.statusCode).toBe(201);
        done();
      });
  });

  it('Checking - GET /api/messages/:id route, expect code 200', async (done) => {
    request(app)
      .get(`/api/messages/${newMessageId}`)
      .set('cookie', cookie)
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.subject).toMatch('NEW');
        expect(response.body.message).toMatch('Message');
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - GET /api/messages/ route, expect code 200', async (done) => {
    request(app)
      .get(`/api/messages/`)
      .set('cookie', cookie)
      .set('user', testUser._id)
      .set('page', 1)
      .set('limit', 10)
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.output[0].subject).toMatch('NEW');
        expect(response.body.output[0].message).toMatch('Message');
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - GET /api/messages/search route, expect code 200 and valid data', async (done) => {
    request(app)
      .get(`/api/messages/search`)
      .set('cookie', cookie)
      .query({ search: 'NEW' })
      .query({ page: 1 })
      .query({ limit: 10 })
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.output[0].subject).toMatch('NEW');
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - GET /api/messages/group/:id route, expect code 200', async (done) => {
    request(app)
      .get(`/api/messages/group/${testGroup._id}`)
      .set('cookie', cookie)
      .query({ page: 1 })
      .query({ limit: 10 })
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.output[0].subject).toMatch('NEW');
        expect(response.body.output[0].message).toMatch('Message');
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - GET /api/messages/branch/:id route, expect code 200', async (done) => {
    request(app)
      .get(`/api/messages/branch/${testBranch._id}`)
      .set('cookie', cookie)
      .query({ page: 1 })
      .query({ limit: 10 })
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.output[0].subject).toMatch('NEW');
        expect(response.body.output[0].message).toMatch('Message');
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - GET /api/messages/user/:id route, expect code 200', async (done) => {
    request(app)
      .get(`/api/messages/user/${testUser._id}`)
      .set('cookie', cookie)
      .query({ page: 1 })
      .query({ limit: 10 })
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body.output[0].subject).toMatch('NEW');
        expect(response.body.output[0].message).toMatch('Message');
        expect(response.statusCode).toBe(200);
        done();
      });
  });

});


describe('Verifying STATISTICS routes.', () => {

  it('Checking - GET /api/stats/users route, expect code 200', async (done) => {
    request(app)
      .get(`/api/stats/users`)
      .set('cookie', cookie)
      .query({months: 24})
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.body[0].view_mode).toMatch('ADMIN');
        expect(response.body[1].months).toBe(24);
        expect(response.body[2].total).toBe(1);
        expect(response.body[2].active).toBe(1);
        expect(response.body[2].disabled).toBe(0);
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('Checking - GET /api/stats/permissions route, expect code 200', async (done) => {
    request(app)
      .get(`/api/stats/permissions`)
      .set('cookie', cookie)
      .query({months: 24})
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        expect(response.body.total).toBe(2);
        expect(response.body.active).toBe(0);
        expect(response.body.disabled).toBe(2);
        done();
      });
  });

  it('Checking - GET /api/stats/tickets route, expect code 200', async (done) => {
    request(app)
      .get(`/api/stats/tickets`)
      .set('cookie', cookie)
      .query({months: 24})
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        expect(response.body[0].view_mode).toMatch('ADMIN');
        expect(response.body[1].months).toBe(24);
        done();
      });
  });

  it('Checking - GET /api/stats/groups route, expect code 200', async (done) => {
    request(app)
      .get(`/api/stats/groups`)
      .set('cookie', cookie)
      .query({months: 24})
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        expect(response.body.total).toBe(2);
        expect(response.body.active).toBe(2);
        expect(response.body.disabled).toBe(0);
        done();
      });
  });

  it('Checking - GET /api/stats/messages route, expect code 200', async (done) => {
    request(app)
      .get(`/api/stats/messages`)
      .set('cookie', cookie)
      .query({months: 24})
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        expect(response.body[0].view_mode).toMatch('ADMIN');
        expect(response.body[2].total).toBe(1);
        expect(response.body[1].months).toBe(24);
        done();
      });
  });

  it('Checking - GET /api/stats/branch route, expect code 200', async (done) => {
    request(app)
      .get(`/api/stats/branch`)
      .set('cookie', cookie)
      .query({branch: testBranch._id.toString()})
      .then((response) => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        expect(response.body.total).toBe(1);
        expect(response.body.active).toBe(1);
        expect(response.body.disabled).toBe(0);
        done();
      });
  });

});

describe('Verifying API DOCS routes.', () => {

    it(`Checking - GET /api/docs/swagger route, expect code 200`, async (done) => {
        request(app)
            .get(`/api/docs/swagger`)
            .set('cookie', cookie)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('application/json');
                expect(response).not.toBeNull();
                done();
            });
    });

    it(`Checking - GET /api/docs/parameters.json route, expect code 200`, async (done) => {
        request(app)
            .get(`/api/docs/parameters.json`)
            .set('cookie', cookie)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('application/json');
                expect(response).not.toBeNull();
                done();
            });
    });

});
