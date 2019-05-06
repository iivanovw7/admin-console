import moxios from 'moxios';
import * as mocks from '../__mocks__/';
import { getSingleTicket, getTickets, searchTickets, updateTicket } from '../actions';
import * as types from '../constants/actionTypes';
import { currentPage, headers, history, limit, mockStore } from '../testUtils';

describe(' actions', () => {
  let store; //creating temporary store variable
  const query = 'TICKET';

  beforeEach(function () {
    moxios.install();
    store = mockStore({}); //create new mock store
  });

  afterEach(function () {
    moxios.uninstall();
    store.clearActions(); //reset actions after each test
  });

  /**
   *  Dispatching getTickets, then imitating response 200 with data,
   *  Comparing action type and payload to expected ones.
   */
  it('Fetches one page with tickets ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        headers,
        response: mocks.TICKETS
      });
    });

    const expectedActions = [
      { type: types.FETCH_TICKETS }
    ];

    return store.dispatch(getTickets(currentPage, limit, history)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0].payload.data).toEqual(mocks.TICKETS);
      expect(storeActions[0].type).toBe(expectedActions[0].type);
    });
  });

  /**
   *  Dispatching getSingleTicket, then imitating response 200
   *  and comparing action type to expected one.
   */
  it('Fetches single ticket ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        headers,
        response: mocks.TICKET
      });
    });

    const expectedActions = [
      { type: types.FETCH_TICKET }
    ];

    return store.dispatch(getSingleTicket(mocks.MESSAGE._id, history)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0].payload.data).toEqual(mocks.TICKET);
      expect(storeActions[0].type).toBe(expectedActions[0].type);
    });

  });

  /**
   *  Dispatching update Ticket, then imitating response 200 and data
   *  Comparing action type and payload data to expected ones.
   */
  it('Update single ticket ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        headers,
        response: mocks.TICKET
      });
    });

    const expectedActions = [
      { type: types.UPDATE_TICKET }
    ];

    return store.dispatch(updateTicket(mocks.TICKET, mocks.TICKET._id, history)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0].payload.data).toEqual(mocks.TICKET);
      expect(storeActions[0].type).toBe(expectedActions[0].type);
    });
  });

  /**
   *  Dispatching searchTicket, then imitating response 200 and data
   *  Comparing action type and payload data to expected ones.
   */
  it('Search tickets action ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        headers,
        response: mocks.TICKET
      });
    });

    const expectedActions = [
      { type: types.SEARCH_TICKETS }
    ];
    const store = mockStore({
      users: {},
      error: null,
      success: null,
      confirmed: false
    });

    return store.dispatch(searchTickets(currentPage, limit, query, history)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0].payload.data).toEqual(mocks.TICKET);
      expect(storeActions[0].type).toBe(expectedActions[0].type);
    });
  });

});
