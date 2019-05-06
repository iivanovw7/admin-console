import moxios from 'moxios';
import * as mocks from '../__mocks__/';
import { getStatistics } from '../actions';
import * as types from '../constants/actionTypes';
import { headers, history, limit, mockStore } from '../testUtils';

describe('Statistics actions', () => {
  let store; //creating temporary store variable

  beforeEach(function () {
    moxios.install();
    store = mockStore({}); //create new mock store
  });

  afterEach(function () {
    moxios.uninstall();
    store.clearActions(); //reset actions after each test
  });

  /**
   *  Dispatching getUsersStats, then imitating response 200 with data,
   *  Comparing action type and payload to expected ones.
   */
  it('Fetches users statistics ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        headers,
        response: mocks.STATS_USERS
      });
    });

    const expectedActions = [
      { type: types.FETCH_USERS_STATS }
    ];

    return store.dispatch(getStatistics('Users', history, limit)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0].payload.data).toEqual(mocks.STATS_USERS);
      expect(storeActions[0].type).toBe(expectedActions[0].type);
    });
  });

  /**
   *  Dispatching getMessagesStats, then imitating response 200 with data,
   *  Comparing action type and payload to expected ones.
   */
  it('Fetches messages statistics ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        headers,
        response: mocks.STATS_MESSAGES
      });
    });

    const expectedActions = [
      { type: types.FETCH_MESSAGES_STATS }
    ];

    return store.dispatch(getStatistics('Messages', history, limit)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0].payload.data).toEqual(mocks.STATS_MESSAGES);
      expect(storeActions[0].type).toBe(expectedActions[0].type);
    });
  });

  /**
   *  Dispatching getPermissionsStats, then imitating response 200 with data,
   *  Comparing action type and payload to expected ones.
   */
  it('Fetches permissions statistics ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        headers,
        response: mocks.STATS_PERMISSIONS
      });
    });

    const expectedActions = [
      { type: types.FETCH_PERMISSIONS_STATS }
    ];

    return store.dispatch(getStatistics('Permissions', history, limit)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0].payload.data).toEqual(mocks.STATS_PERMISSIONS);
      expect(storeActions[0].type).toBe(expectedActions[0].type);
    });
  });

  /**
   *  Dispatching getGroupsStats, then imitating response 200 with data,
   *  Comparing action type and payload to expected ones.
   */
  it('Fetches groups statistics ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        headers,
        response: mocks.STATS_GROUPS
      });
    });

    const expectedActions = [
      { type: types.FETCH_GROUPS_STATS }
    ];

    return store.dispatch(getStatistics('Groups', history, limit)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0].payload.data).toEqual(mocks.STATS_GROUPS);
      expect(storeActions[0].type).toBe(expectedActions[0].type);
    });
  });

  /**
   *  Dispatching getTicketsStats, then imitating response 200 with data,
   *  Comparing action type and payload to expected ones.
   */
  it('Fetches tickets statistics ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        headers,
        response: mocks.STATS_TICKETS
      });
    });

    const expectedActions = [
      { type: types.FETCH_TICKETS_STATS }
    ];

    return store.dispatch(getStatistics('Tickets', history, limit)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0].payload.data).toEqual(mocks.STATS_TICKETS);
      expect(storeActions[0].type).toBe(expectedActions[0].type);
    });
  });
});
