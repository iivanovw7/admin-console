import * as mocks from '../__mocks__/';
import * as types from '../constants/actionTypes';
import authReducer from './authReducer';

const initialState = {
  error: null
};

const setup = (initialState) => {

  describe('AUTH reducers', () => {

    it('AUTH ERROR reducer', () => {
      const expectedActions = {
        type: types.AUTHENTICATION_ERROR,
        error: 'Authentication error!'
      };

      expect(authReducer(initialState, expectedActions)).toEqual({ error: 'Authentication error!' });
    });

    it('LOGOUT reducer', () => {
      const expectedActions = {
        type: types.UNAUTHENTICATED,
        user: {
          authenticated: false,
          loggedUserObject: false
        },
        error: null
      };

      expect(authReducer(initialState, expectedActions)).toEqual({
        user: expectedActions.user,
        error: null
      });
    });

    it('LOGIN reducer', () => {
      const expectedActions = {
        type: types.AUTHENTICATED,
        user: mocks.USER
      };

      expect(authReducer(initialState, expectedActions)).toEqual({
        user: {
          authenticated: true,
          loggedUserObject: mocks.USER
        },
        error: null
      });
    });

  });

};

setup(initialState);
