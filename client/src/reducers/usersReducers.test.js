import * as mocks from '../__mocks__/';
import * as types from '../constants/actionTypes';
import { formLocalizedNotification as message } from '../localization/notifications';
import usersReducer, { displayStatus } from '../reducers/usersReducer';

const setup = (initialState = {}) => {

  describe('USERS reducers', () => {

    it('FETCH USERS', () => {
      const expectedActions = {
        type: types.FETCH_USERS,
        payload: {
          data: mocks.USERS
        }
      };

      expect(usersReducer(initialState, expectedActions)).toEqual({
        list: expectedActions.payload.data,
        error: null,
        success: null
      });

    });

    it('FETCH USER', () => {
      const expectedActions = {
        type: types.FETCH_USER,
        payload: {
          user: mocks.USER
        }
      };

      expect(usersReducer(initialState, expectedActions)).toEqual({
        user: expectedActions.payload.data,
        error: null,
        success: null
      });

    });

    it('UPDATE USER', () => {
      const expectedActions = {
        type: types.UPDATE_USER,
        payload: {
          data: mocks.USER
        }
      };

      expect(usersReducer(initialState, expectedActions)).toEqual({
        user: {},
        error: null,
        success: message(
          expectedActions.payload.data.name + ' ' + expectedActions.payload.data.surname,
          expectedActions,
          'en'
        ),
        confirmed: false
      });

    });

    it('CHANGE USER STATUS', () => {
      const expectedActions = {
        type: types.CHANGE_USER_STATUS,
        payload: {
          data: mocks.USER
        }
      };

      expect(usersReducer(initialState, expectedActions)).toEqual({
        error: null,
        success: message(
          expectedActions.payload.data.name + ' ' + expectedActions.payload.data.surname,
          expectedActions,
          'en',
          displayStatus(expectedActions.payload.data.status)
        ),
        confirmed: false
      });
    });

    it('GENERAL ERROR', () => {
      const expectedActions = {
        type: types.GENERAL_ERROR,
        payload: {
          data: mocks.USER
        }
      };

      expect(usersReducer(initialState, expectedActions)).toEqual({
        list: {
          page: 1,
          search: null
        },
        user: null,
        error: message(
          null,
          expectedActions,
          'en'
        ),
        success: null,
        confirmed: false
      });
    });

    it('FETCH ERROR', () => {
      const expectedActions = {
        type: types.FETCH_ERROR,
        payload: {
          data: mocks.USER
        }
      };

      expect(usersReducer(initialState, expectedActions)).toEqual({
        list: {
          page: 1,
          search: null
        },
        user: null,
        error: message(
          null,
          expectedActions,
          'en'
        ),
        success: null,
        confirmed: false
      });
    });

    it('CONFIRM NOTIFICATION', () => {
      const expectedActions = {
        type: types.CONFIRM_NOTIFICATION,
        confirmed: true
      };

      expect(usersReducer(initialState, expectedActions)).toMatchSnapshot();
    });

  });

};

setup();
