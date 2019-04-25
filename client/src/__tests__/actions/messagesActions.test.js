import { createMemoryHistory } from 'history';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { sendMessage, getMessages, getSingleMessage, searchMessages } from '../../actions';
import * as types from '../../constants/actionTypes';
import * as mocks from './../../__mocks__/';

//Applying middlewares and history object
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory('/dashboard');
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
let store; //creating temporary store variable

const setup = () => {

  describe('Messages actions', () => {
    const limit = 10;
    const currentPage = 2;
    const query = 'ADMIN';

    beforeEach(function () {
      moxios.install();
      store = mockStore({}); //create new mock store
    });

    afterEach(function () {
      moxios.uninstall();
      store.clearActions(); //reset actions after each test
    });

    /**
     *  Dispatching getMessages, then imitating response 200 with data,
     *  Comparing action type and payload to expected ones.
     */
    it('Fetches one page with messages ', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          headers,
          response: mocks.MESSAGES
        });
      });

      const expectedActions = [
        { type: types.FETCH_MESSAGES }
      ];

      return store.dispatch(getMessages(currentPage, limit, history)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].payload.data).toEqual(mocks.MESSAGES);
        expect(storeActions[0].type).toBe(expectedActions[0].type);
      });
    });

    /**
     *  Dispatching getSingleMessage, then imitating response 200
     *  and comparing action type to expected one.
     */
    it('Fetches single message ', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          headers,
          response: mocks.MESSAGE
        });
      });

      const expectedActions = [
        { type: types.FETCH_MESSAGE }
      ];

      return store.dispatch(getSingleMessage(mocks.MESSAGE._id, history)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].payload.data).toEqual(mocks.MESSAGE);
        expect(storeActions[0].type).toBe(expectedActions[0].type);
      });

    });

    /**
     *  Dispatching sendMessage, then imitating response 200 and data
     *  Comparing action type and payload data to expected ones.
     */
    it('Create single message ', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          headers,
          response: mocks.MESSAGE
        });
      });

      const expectedActions = [
        { type: types.ADD_MESSAGE }
      ];

      return store.dispatch(sendMessage(mocks.MESSAGE, mocks.MESSAGE._id, history)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].payload.data).toEqual(mocks.MESSAGE);
        expect(storeActions[0].type).toBe(expectedActions[0].type);
      });
    });

    /**
     *  Dispatching searchMessage, then imitating response 200 and data
     *  Comparing action type and payload data to expected ones.
     */
    it('Search message action ', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          headers,
          response: mocks.MESSAGE
        });
      });

      const expectedActions = [
        { type: types.SEARCH_MESSAGES }
      ];
      const store = mockStore({
        users: {},
        error: null,
        success: null,
        confirmed: false
      });

      return store.dispatch(searchMessages(currentPage, limit, query, history)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].payload.data).toEqual(mocks.MESSAGE);
        expect(storeActions[0].type).toBe(expectedActions[0].type);
      });
    });


  });
};

setup();
