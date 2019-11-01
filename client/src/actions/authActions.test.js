import moxios from 'moxios';
import { loginUser, logoutUser } from '../actions';
import * as types from '../constants/actionTypes';
import * as mocks from '../__mocks__/';
import { mockStore, headers, history } from '../testUtils';

describe('AUTH actions', () => {

  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  /**
   *  Dispatching logout, then imitating response 200
   *  and comparing action type to expected one.
   */
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

  /**
   *  Dispatching login with mock user, then imitating response 200 with user data
   *  Comparing action type and payload to expected ones.
   */
  it('Performs Login action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        headers: headers,
        response: mocks.USER,
      });
    });

    const expectedActions = [
      { type: types.AUTHENTICATED },
    ];
    const store = mockStore({
      user: {
        authenticated: true,
        loggedUserObject: undefined
      },
      error: null
    });

    return store.dispatch(loginUser({email: 'admin@company.org', password: 'password'}, history)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0].payload.data).toEqual(mocks.USER);
      expect(storeActions[0].type).toBe(expectedActions[0].type);
    });
  });

  /**
   *  Dispatching login with wrong credentials, then imitating response 403
   *  and comparing action type to expected one.
   */
  it('Login attempt with wrong password', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 403,
        headers: headers,
      });
    });

    const expectedActions = [
      { type: types.AUTHENTICATION_ERROR },
    ];
    const store = mockStore({
      user: {
        authenticated: false,
        loggedUserObject: undefined
      },
      error: null
    });

    return store.dispatch(loginUser({email: 'admin@company.org', password: 'password'}, history)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});

