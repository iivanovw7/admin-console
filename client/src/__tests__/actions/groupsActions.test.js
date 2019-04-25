import { createMemoryHistory } from 'history';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { deleteGroup, getGroups, getSingleGroup, updateGroup } from '../../actions';
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

  describe('GROUP actions', () => {
    const limit = 10;
    const currentPage = 2;

    beforeEach(function () {
      moxios.install();
      store = mockStore({}); //create new mock store
    });

    afterEach(function () {
      moxios.uninstall();
      store.clearActions(); //reset actions after each test
    });

    /**
     *  Dispatching getGroups, then imitating response 200 with data,
     *  Comparing action type and payload to expected ones.
     */
    it('Fetches one page ', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          headers,
          response: mocks.GROUPS
        });
      });

      const expectedActions = [
        { type: types.FETCH_GROUPS }
      ];

      return store.dispatch(getGroups(currentPage, limit, history)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].payload.data).toEqual(mocks.GROUPS);
        expect(storeActions[0].type).toBe(expectedActions[0].type);
      });
    });

    /**
     *  Dispatching getSingleGroup, then imitating response 200
     *  and comparing action type to expected one.
     */
    it('Fetches single group ', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          headers,
          response: mocks.GROUP
        });
      });

      const expectedActions = [
        { type: types.FETCH_GROUP }
      ];

      return store.dispatch(getSingleGroup(mocks.GROUP._id, history)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].payload.data).toEqual(mocks.GROUP);
        expect(storeActions[0].type).toBe(expectedActions[0].type);
      });

    });

    /**
     *  Dispatching updateGroup, then imitating response 200 and data
     *  Comparing action type data to expected ones.
     */
    it('Updates single group ', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          headers,
          response: mocks.GROUP
        });
      });

      const expectedActions = [
        { type: types.UPDATE_GROUP }
      ];

      return store.dispatch(updateGroup(mocks.GROUP, mocks.GROUP._id, history)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].payload.data).toEqual(mocks.GROUP);
        expect(storeActions[0].type).toBe(expectedActions[0].type);
      });
    });

    /**
     * Dispatching deleteGroup action, then imitating response and
     * Comparing action type and payload data to expected ones.
     */
    it('Delete role action', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          headers,
          response: mocks.GROUP
        });
      });

      const expectedActions = [
        { type: types.DELETE_GROUP }
      ];

      return store.dispatch(deleteGroup(mocks.GROUP._id)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].payload.data).toEqual(mocks.GROUP);
        expect(storeActions[0].type).toBe(expectedActions[0].type);
      });
    });

  });
};

setup();