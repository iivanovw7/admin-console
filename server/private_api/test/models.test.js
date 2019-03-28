import mongoose from 'mongoose';
import mockingoose from 'mockingoose';
import Branch from '../../models/Branch.js';
import User from '../../models/User.js';
import Message from '../../models/Message.js';
import Group from '../../models/Group.js';
import Role from '../../models/Role';
import Ticket from '../../models/Ticket';
import History from '../../models/History';
import MockDate from 'mockdate';

/** Removes test user and clears history records from database */
beforeEach(async (done) => {

  mockingoose.resetAll();
  MockDate.set(1434319925275);
  done();

});

afterEach(() => {

  MockDate.reset();

});

/**
 *  Testing mongo models and data, fetching first one element in the collection
 *  Checks History model, adds history event and finds it back by id
 */

describe('Trying to find and update one object in every model', function () {

  it('Find user.', async () => {

    const roleID = mongoose.Types.ObjectId().toString();
    const user = {
      _id: '507f191e810c19729de860ea',
      email: 'jest_test@mail.com',
      name: 'Test',
      surname: 'Test',
      role: roleID,
      created: new Date().toISOString(),
      status: false
    };

    mockingoose.User.toReturn(user, 'findOne');

    User.findOne({ _id: '507f191e810c19729de860ea' })
        .then(doc => {
          expect(JSON.parse(JSON.stringify(doc))).toMatchObject(user);
        })
        .catch(e => console.log(e));

  });

  it('Update user.', async () => {

    const roleID = mongoose.Types.ObjectId().toString();
    const user = {
      _id: '507f191e810c19729de860ea',
      email: 'jest_test@mail.com',
      name: 'Test',
      surname: 'Test',
      role: roleID,
      created: new Date().toISOString(),
      status: false
    };

    mockingoose.User.toReturn(user, 'update');

    User.update({ name: 'changed' })
        .where({ _id: '507f191e810c19729de860ea' })
        .then(doc => {
          expect(JSON.parse(JSON.stringify(doc))).toMatchObject(user);
        })
        .catch(e => console.log(e));

  });

  it('Find message.', async () => {

    const branchId = mongoose.Types.ObjectId().toString();
    const groupId = mongoose.Types.ObjectId().toString();
    const senderId = mongoose.Types.ObjectId().toString();

    const message = {
      _id: '507f191e810c19729de860ea',
      subject: 'test subject',
      message: 'Test',
      created: new Date().toISOString(),
      branchId: branchId,
      groupId: groupId,
      senderId: senderId
    };

    mockingoose.Message.toReturn(message, 'findOne');

    Message.findOne({ _id: '507f191e810c19729de860ea' })
           .then(doc => {
             expect(JSON.parse(JSON.stringify(doc))).toMatchObject(message);
           })
           .catch(e => console.log(e));

  });

  it('Update message.', async () => {

    const branchId = mongoose.Types.ObjectId().toString();
    const groupId = mongoose.Types.ObjectId().toString();
    const senderId = mongoose.Types.ObjectId().toString();

    const message = {
      _id: '507f191e810c19729de860ea',
      subject: 'test subject',
      message: 'Test',
      created: new Date().toISOString(),
      branchId: branchId,
      groupId: groupId,
      senderId: senderId
    };

    mockingoose.Message.toReturn(message, 'update');

    Message.update({ message: 'changed message' })
           .where({ _id: '507f191e810c19729de860ea' })
           .then(doc => {
             expect(JSON.parse(JSON.stringify(doc))).toMatchObject(message);
           })
           .catch(e => console.log(e));

  });

  it('Find branch.', async () => {

    const branch = {
      _id: '507f191e810c19729de860ea',
      name: 'TestName',
      email: 'TestEmail',
      phone: 'TestPhone',
      fax: 'TestFax',
      address: 'TestAddress',
      information: 'TestInformation',
      status: true
    };

    mockingoose.Branch.toReturn(branch, 'findOne');

    Branch.findOne({ _id: '507f191e810c19729de860ea' })
          .then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(branch);
          })
          .catch(e => console.log(e));

  });

  it('Update branch.', async () => {

    const branch = {
      _id: '507f191e810c19729de860ea',
      name: 'TestName',
      email: 'TestEmail',
      phone: 'TestPhone',
      fax: 'TestFax',
      address: 'TestAddress',
      information: 'TestInformation',
      status: true
    };

    mockingoose.Branch.toReturn(branch, 'update');

    Branch.update({ name: 'Changed name' })
          .where({ _id: '507f191e810c19729de860ea' })
          .then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(branch);
          })
          .catch(e => console.log(e));

  });

  it('Find role.', async () => {

    const role = {
      _id: '507f191e810c19729de860ea',
      name: 'TestRoleName',
      code: 'TEST',
      description: 'TestDescription',
      active: true,
      public: true,
      editable: true
    };

    mockingoose.Role.toReturn(role, 'findOne');

    Role.findOne({ _id: '507f191e810c19729de860ea' })
        .then(doc => {
          expect(JSON.parse(JSON.stringify(doc))).toMatchObject(role);
        })
        .catch(e => console.log(e));

  });

  it('Update role.', async () => {

    const role = {
      _id: '507f191e810c19729de860ea',
      name: 'TestRoleName',
      code: 'TEST',
      description: 'TestDescription',
      active: true,
      public: true,
      editable: true
    };

    mockingoose.Role.toReturn(role, 'update');

    Role.update({ name: 'Changed name' })
        .where({ _id: '507f191e810c19729de860ea' })
        .then(doc => {
          expect(JSON.parse(JSON.stringify(doc))).toMatchObject(role);
        })
        .catch(e => console.log(e));

  });

  it('Find group.', async () => {

    const group = {
      _id: '507f191e810c19729de860ea',
      name: 'TestGroupName',
      status: true,
      description: 'TestDescription',
      permissions: true
    };

    mockingoose.Group.toReturn(group, 'findOne');

    Group.findOne({ _id: '507f191e810c19729de860ea' })
         .then(doc => {
           expect(JSON.parse(JSON.stringify(doc))).toMatchObject(group);
         })
         .catch(e => console.log(e));

  });

  it('Update group.', async () => {

    const group = {
      _id: '507f191e810c19729de860ea',
      name: 'TestGroupName',
      status: true,
      description: 'TestDescription',
      permissions: true
    };

    mockingoose.Group.toReturn(group, 'update');

    Group.update({ name: 'Changed name' })
         .where({ _id: '507f191e810c19729de860ea' })
         .then(doc => {
           expect(JSON.parse(JSON.stringify(doc))).toMatchObject(group);
         })
         .catch(e => console.log(e));

  });

  it('Find ticket.', async () => {

    const authorId = mongoose.Types.ObjectId().toString();
    const branchId = mongoose.Types.ObjectId().toString();

    const tickets = {
      _id: '507f191e810c19729de860ea',
      authorId: authorId,
      branchId: branchId,
      message: 'TEST',
      note: 'TEST',
      subject: 'TEST',
      status: 'TEST',
      created: new Date().toISOString(),
      closed: new Date().toISOString()
    };

    mockingoose.Ticket.toReturn(tickets, 'findOne');

    Ticket.findOne({ _id: '507f191e810c19729de860ea' })
          .then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(tickets);
          })
          .catch(e => console.log(e));

  });

  it('Update ticket.', async () => {

    const authorId = mongoose.Types.ObjectId().toString();
    const branchId = mongoose.Types.ObjectId().toString();

    const tickets = {
      _id: '507f191e810c19729de860ea',
      authorId: authorId,
      branchId: branchId,
      message: 'TEST',
      note: 'TEST',
      subject: 'TEST',
      status: 'TEST',
      created: new Date().toISOString(),
      closed: new Date().toISOString()
    };

    mockingoose.Ticket.toReturn(tickets, 'update');

    Ticket.update({ subject: 'Changed name' })
          .where({ _id: '507f191e810c19729de860ea' })
          .then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(tickets);
          })
          .catch(e => console.log(e));

  });

  it('Find history.', async () => {

    const actionAuthor = mongoose.Types.ObjectId().toString();
    const actionTarget = mongoose.Types.ObjectId().toString();

    const history = {
      _id: '507f191e810c19729de860ea',
      actionAuthor: actionAuthor,
      actionTargetModel: 'User',
      actionTarget: actionTarget,
      actionType: 'Update'
    };

    mockingoose.History.toReturn(history, 'findOne');

    History.findOne({ _id: '507f191e810c19729de860ea' })
           .then(doc => {
             expect(JSON.parse(JSON.stringify(doc))).toMatchObject(history);
           })
           .catch(e => console.log(e));

  });

  it('Update history.', async () => {

    const actionAuthor = mongoose.Types.ObjectId().toString();
    const actionTarget = mongoose.Types.ObjectId().toString();

    const history = {
      _id: '507f191e810c19729de860ea',
      actionAuthor: actionAuthor,
      actionTargetModel: 'User',
      actionTarget: actionTarget,
      actionType: 'Update'
    };

    mockingoose.History.toReturn(history, 'update');

    History.update({ actionType: 'Changed' })
           .where({ _id: '507f191e810c19729de860ea' })
           .then(doc => {
             expect(JSON.parse(JSON.stringify(doc))).toMatchObject(history);
           })
           .catch(e => console.log(e));

  });

});




