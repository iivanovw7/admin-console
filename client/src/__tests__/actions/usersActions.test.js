import { createMemoryHistory } from 'history';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as mocks from './../../__mocks__/';
import { getUsers, searchUsers, updateUser, getSingleUser } from '../../actions';
import * as types from '../../constants/actionTypes';

//Applying middlewares and history object
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory('/dashboard');
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const setup = () => {

  describe('USERS actions', () => {
    const limit = 10;
    const currentPage = 2;
    const query = 'ADMIN';

    beforeEach(function () {
      moxios.install();
    });

    afterEach(function () {
      moxios.uninstall();
    });

    /**
     *  Dispatching getUsers, then imitating response 200 with data,
     *  Comparing action type and payload to expected ones.
     */
    it('Fetches one page ', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          headers,
          response: mocks.USERS
        });
      });

      const expectedActions = [
        { type: types.FETCH_USERS }
      ];
      const store = mockStore({
        user: {},
        list: {},
        error: null,
        success: null
      });

      return store.dispatch(getUsers(currentPage, limit, history)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].payload.data).toEqual(mocks.USERS);
        expect(storeActions[0].type).toBe(expectedActions[0].type);
      });
    });

    /**
     *  Dispatching getSingleUser, then imitating response 200
     *  and comparing action type to expected one.
     */
    it('Fetches single user ', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          headers,
          response: mocks.USER
        });
      });

      const expectedActions = [
        { type: types.FETCH_USER }
      ];
      const store = mockStore({
        user: {},
        list: {},
        error: null,
        success: null
      });

      return store.dispatch(getSingleUser(mocks.USER._id, history)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].payload.data).toEqual(mocks.USER);
        expect(storeActions[0].type).toBe(expectedActions[0].type);
      });

    });

    /**
     *  Dispatching updateUser, then imitating response 200 and data
     *  Comparing action type data to expected ones.
     */
    it('Updates single user ', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          headers,
          response: mocks.USER
        });
      });

      const expectedActions = [
        { type: types.UPDATE_USER }
      ];
      const store = mockStore({
        user: {},
        error: null,
        success: null,
        confirmed: false
      });

      return store.dispatch(updateUser(mocks.USER, mocks.USER._id, history)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].payload.data).toEqual(mocks.USER);
        expect(storeActions[0].type).toBe(expectedActions[0].type);
      });
    });

    it('Search users action ', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          headers,
          response: mocks.USER
        });
      });

      const expectedActions = [
        { type: types.SEARCH_USERS }
      ];
      const store = mockStore({
        users: {},
        error: null,
        success: null,
        confirmed: false
      });

      return store.dispatch(searchUsers(currentPage, limit, query, history)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].payload.data).toEqual(mocks.USER);
        expect(storeActions[0].type).toBe(expectedActions[0].type);
      });
    });

  });
};

setup();