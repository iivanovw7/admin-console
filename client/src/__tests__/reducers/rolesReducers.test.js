import * as types from '../../constants/actionTypes';
import { formLocalizedNotification as message } from '../../localization/notifications';
import rolesReducer, { displayStatus } from '../../reducers/rolesReducer';
import * as mocks from './../../__mocks__/';

const setup = () => {

  describe('ROLES reducers', () => {

    it('FETCH ROLES', () => {
      const expectedActions = {
        type: types.FETCH_ROLES,
        payload: {
          data: mocks.ROLES
        }
      };

      expect(rolesReducer({}, expectedActions)).toEqual({
        role: {},
        list: expectedActions.payload.data,
        error: null,
        success: null
      });

    });

    it('FETCH ROLE', () => {
      const expectedActions = {
        type: types.FETCH_ROLE,
        payload: {
          role: mocks.ROLE
        }
      };

      expect(rolesReducer({}, expectedActions)).toEqual({
        role: expectedActions.payload.data,
        error: null,
        success: null
      });

    });

    it('UPDATE ROLE', () => {
      const expectedActions = {
        type: types.UPDATE_ROLE,
        payload: {
          data: mocks.CHANGED_ROLE
        }
      };

      expect(rolesReducer({}, expectedActions)).toEqual({
        role: {},
        error: null,
        success: message(
          expectedActions.payload.data.newRole.name,
          expectedActions,
          'en'
        ),
        confirmed: false,
      });

    });

    it('CHANGE ROLE STATUS', () => {
      const expectedActions = {
        type: types.CHANGE_ROLE_STATUS,
        payload: {
          data: mocks.CHANGED_ROLE
        }
      };

      expect(rolesReducer({}, expectedActions)).toEqual({
        role: {},
        error: null,
        success: message(
          expectedActions.payload.data.newRole.name,
          expectedActions,
          'en',
          displayStatus(expectedActions.payload.data.newRole.active)
        ),
        confirmed: false
      });
    });

    it('GENERAL ERROR', () => {
      const expectedActions = {
        type: types.GENERAL_ERROR,
        payload: {
          data: mocks.ROLES
        }
      };

      expect(rolesReducer({}, expectedActions)).toEqual({
        list: {
          page: 1
        },
        role: {},
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
          data: mocks.ROLES
        }
      };

      expect(rolesReducer({}, expectedActions)).toEqual({
        list: {
          page: 1
        },
        role: {},
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

      expect(rolesReducer({}, expectedActions)).toMatchSnapshot();
    });

  });

};

setup();