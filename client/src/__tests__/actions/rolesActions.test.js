import { createMemoryHistory } from 'history';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as mocks from './../../__mocks__/';
import { getRoles, deleteRole, addNewRole, updateRole, getSingleRole } from '../../actions';
import * as types from '../../constants/actionTypes';

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

  describe('ROLES actions', () => {
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
     *  Dispatching getRoles, then imitating response 200 with data,
     *  Comparing action type and payload to expected ones.
     */
    it('Fetches one page ', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          headers,
          response: mocks.ROLES
        });
      });

      const expectedActions = [
        { type: types.FETCH_ROLES }
      ];

      return store.dispatch(getRoles(currentPage, limit, history)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].payload.data).toEqual(mocks.ROLES);
        expect(storeActions[0].type).toBe(expectedActions[0].type);
      });
    });

    /**
     *  Dispatching getSingleRole, then imitating response 200
     *  and comparing action type to expected one.
     */
    it('Fetches single role ', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          headers,
          response: mocks.ROLE
        });
      });

      const expectedActions = [
        { type: types.FETCH_ROLE }
      ];

      return store.dispatch(getSingleRole(mocks.ROLE._id, history)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].payload.data).toEqual(mocks.ROLE);
        expect(storeActions[0].type).toBe(expectedActions[0].type);
      });

    });

    /**
     *  Dispatching updateRole, then imitating response 200 and data
     *  Comparing action type and payload data to expected ones.
     */
    it('Updates single role ', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          headers,
          response: mocks.ROLE
        });
      });

      const expectedActions = [
        { type: types.UPDATE_ROLE }
      ];

      return store.dispatch(updateRole(mocks.ROLE, mocks.ROLE._id, history)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].payload.data).toEqual(mocks.ROLE);
        expect(storeActions[0].type).toBe(expectedActions[0].type);
      });
    });

    /**
     *  Dispatching addNewRole action, then imitating response 200 and
     *  Comparing action type and payload data to expected ones.
     */
    it('Add role action ', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          headers,
          response: mocks.ROLE
        });
      });

      const expectedActions = [
        { type: types.ADD_ROLE }
      ];

      return store.dispatch(addNewRole(mocks.ROLE)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].payload.data).toEqual(mocks.ROLE);
        expect(storeActions[0].type).toBe(expectedActions[0].type);
      });
    });

    /**
     * Dispatching deleteRole action, then imitating response and
     * Comparing action type and payload data to expected ones.
     */
    it('Delete role action', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          headers,
          response: mocks.ROLE
        });
      });

      const expectedActions = [
        { type: types.DELETE_ROLE }
      ];

      return store.dispatch(deleteRole(mocks.ROLE._id)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].payload.data).toEqual(mocks.ROLE);
        expect(storeActions[0].type).toBe(expectedActions[0].type);
      });
    });

  });
};

setup();