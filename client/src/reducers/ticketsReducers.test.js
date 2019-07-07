import * as mocks from '../__mocks__/';
import * as types from '../constants/actionTypes';
import { formLocalizedNotification as message } from '../localization/notifications';
import ticketsReducer from './ticketsReducer';

const setup = (initialState = {}) => {

  describe('TICKETS reducers', () => {

    it('FETCH TICKETS', () => {
      const expectedActions = {
        type: types.FETCH_TICKETS,
        payload: {
          data: mocks.TICKETS
        }
      };

      expect(ticketsReducer(initialState, expectedActions)).toEqual({
        list: expectedActions.payload.data,
        error: null,
        success: null
      });

    });

    it('FETCH TICKET', () => {
      const expectedActions = {
        type: types.FETCH_TICKET,
        payload: {
          data: mocks.TICKET
        }
      };

      expect(ticketsReducer(initialState, expectedActions)).toEqual({
        ticket: expectedActions.payload.data,
        error: null,
        success: null
      });

    });

    it('SEARCH TICKETS', () => {
      const expectedActions = {
        type: types.SEARCH_TICKETS,
        payload: {
          data: mocks.TICKETS
        }
      };

      expect(ticketsReducer(initialState, expectedActions)).toEqual({
        list: expectedActions.payload.data,
        error: null,
        success: null
      });

    });


    it('GENERAL ERROR', () => {
      const expectedActions = {
        type: types.GENERAL_ERROR,
        payload: {
          data: mocks.TICKETS
        }
      };

      expect(ticketsReducer(initialState, expectedActions)).toEqual({
        list: {
          page: 1,
          search: null
        },
        ticket: null,
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
          data: mocks.TICKETS
        }
      };

      expect(ticketsReducer(initialState, expectedActions)).toEqual({
        list: {
          page: 1,
          search: null
        },
        ticket: null,
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
      expect(ticketsReducer(initialState, expectedActions)).toMatchSnapshot();
    });

  });

};

setup();
