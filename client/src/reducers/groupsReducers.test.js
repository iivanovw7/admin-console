import * as mocks from '../__mocks__/';
import * as types from '../constants/actionTypes';
import { formLocalizedNotification as message } from '../localization/notifications';
import groupsReducer, { displayStatus } from './groupsReducer';

const setup = (initialState = {}) => {

  describe('GROUPS reducers', () => {

    it('FETCH GROUPS', () => {
      const expectedActions = {
        type: types.FETCH_GROUPS,
        payload: {
          data: mocks.GROUPS
        }
      };

      expect(groupsReducer(initialState, expectedActions)).toEqual({
        group: {},
        list: expectedActions.payload.data,
        error: null,
        success: null
      });

    });

    it('FETCH GROUP', () => {
      const expectedActions = {
        type: types.FETCH_GROUP,
        payload: {
          group: mocks.GROUP
        }
      };

      expect(groupsReducer(initialState, expectedActions)).toEqual({
        group: expectedActions.payload.data,
        error: null,
        success: null
      });

    });

    it('UPDATE GROUP', () => {
      const expectedActions = {
        type: types.UPDATE_GROUP,
        payload: {
          data: mocks.GROUP
        }
      };

      expect(groupsReducer(initialState, expectedActions)).toEqual({
        group: {},
        error: null,
        success: message(
          expectedActions.payload.data.name,
          expectedActions,
          'en'
        ),
        confirmed: false
      });

    });

    it('CHANGE GROUP STATUS', () => {
      const expectedActions = {
        type: types.CHANGE_GROUP_STATUS,
        payload: {
          data: mocks.GROUP
        }
      };

      expect(groupsReducer(initialState, expectedActions)).toEqual({
        group: {},
        error: null,
        success: message(
          expectedActions.payload.data.name,
          expectedActions,
          'en',
          displayStatus(expectedActions.payload.data.status)
        ),
        confirmed: false,
      });
    });

    it('GENERAL ERROR', () => {
      const expectedActions = {
        type: types.GENERAL_ERROR,
        payload: {
          data: mocks.ROLE
        }
      };

      expect(groupsReducer(initialState, expectedActions)).toEqual({
        list: {
          page: 1
        },
        group: {},
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
          data: mocks.GROUP
        }
      };

      expect(groupsReducer(initialState, expectedActions)).toEqual({
        list: {
          page: 1
        },
        group: {},
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

      expect(groupsReducer(initialState, expectedActions)).toMatchSnapshot();
    });

  });

};

setup();
