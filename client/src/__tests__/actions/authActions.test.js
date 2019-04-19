import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import { loginUser, logoutUser } from '../../actions';
import * as types from '../../constants/actionTypes';
import { createMemoryHistory } from 'history';
import userMock from './../../__mocks__/user.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory('/dashboard');

const setup = () => {

  describe('AUTH actions', () => {

    beforeEach(function () {
      moxios.install();
    });

    afterEach(function () {
      moxios.uninstall();
    });

    it('Performs Logout action', () => {

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {},
        });
      });

      const expectedActions = [
        { type: types.UNAUTHENTICATED },
      ];

      const store = mockStore({
        user: {
          authenticated: false,
          loggedUserObject: undefined
        },
        error: null
      });

      return store.dispatch(logoutUser(history)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('Performs Login action', () => {

      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          headers: headers,
          response: {
            userMock
          },
        });
      });

      const expectedActions = [
        { type: types.AUTHENTICATED },
      ];

      const store = mockStore({
        user: {
          authenticated: true,
          loggedUserObject: userMock
        },
        error: null
      });

      return store.dispatch(loginUser({email: 'admin@company.org', password: 'password'}, history)).then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0].type).toBe(expectedActions[0].type);
      });
    });

  });

};


setup();