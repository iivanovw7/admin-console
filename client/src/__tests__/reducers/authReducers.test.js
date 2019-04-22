import * as types from '../../constants/actionTypes';
import authReducer from '../../reducers/authReducer';
import * as mocks from './../../__mocks__/';

const setup = () => {

  describe('AUTH reducers', () => {

    it('AUTH ERROR reducer', () => {
      const expectedActions = {
        type: types.AUTHENTICATION_ERROR,
        error: 'Authentication error!'
      };

      expect(authReducer({}, expectedActions)).toEqual({ error: 'Authentication error!' });
    });

    it('LOGOUT reducer', () => {
      const expectedActions = {
        type: types.UNAUTHENTICATED,
        user: {
          authenticated: false,
          loggedUserObject: null
        },
        error: null
      };

      expect(authReducer({}, expectedActions)).toEqual({
        user: expectedActions.user,
        error: null
      });
    });

    it('LOGIN reducer', () => {
      const expectedActions = {
        type: types.AUTHENTICATED,
        payload: {
          data: mocks.USER
        }
      };

      expect(authReducer({}, expectedActions)).toEqual({
        user: {
          authenticated: true,
          loggedUserObject: mocks.USER
        },
        error: null
      });
    });

  });

};

setup();