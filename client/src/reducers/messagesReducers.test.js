import * as mocks from '../__mocks__/';
import * as types from '../constants/actionTypes';
import { formLocalizedNotification as message } from '../localization/notifications';
import messagesReducer from './messagesReducer';

const setup = (initialState = {}) => {

  describe('MESSAGES reducers', () => {

    it('FETCH MESSAGES', () => {
      const expectedActions = {
        type: types.FETCH_MESSAGES,
        payload: {
          data: mocks.MESSAGES
        }
      };

      expect(messagesReducer(initialState, expectedActions)).toEqual({
        message: {},
        list: expectedActions.payload.data,
        error: null,
        success: null
      });

    });

    it('FETCH MESSAGE', () => {
      const expectedActions = {
        type: types.FETCH_MESSAGE,
        payload: {
          data: mocks.MESSAGE
        }
      };

      expect(messagesReducer(initialState, expectedActions)).toEqual({
        message: expectedActions.payload.data,
        error: null,
        success: null
      });

    });

    it('ADD MESSAGE', () => {
      const expectedActions = {
        type: types.ADD_MESSAGE,
        payload: {
          data: mocks.MESSAGE
        }
      };

      expect(messagesReducer(initialState, expectedActions)).toEqual({
        message: {},
        error: null,
        success: message(
          expectedActions.payload.data.subject,
          expectedActions,
          'en'
        ),
        confirmed: false
      });

    });

    it('SEARCH MESSAGES', () => {
      const expectedActions = {
        type: types.SEARCH_MESSAGES,
        payload: {
          data: mocks.MESSAGES
        }
      };

      expect(messagesReducer(initialState, expectedActions)).toEqual({
        message: {},
        list: expectedActions.payload.data,
        error: null,
        success: null
      });

    });


    it('GENERAL ERROR', () => {
      const expectedActions = {
        type: types.GENERAL_ERROR,
        payload: {
          data: mocks.ROLES
        }
      };

      expect(messagesReducer(initialState, expectedActions)).toEqual({
        list: {
          page: 1,
          search: null
        },
        message: {},
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

      expect(messagesReducer(initialState, expectedActions)).toEqual({
        list: {
          page: 1,
          search: null
        },
        message: {},
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

      expect(messagesReducer(initialState, expectedActions)).toMatchSnapshot();
    });

  });

};

setup();
