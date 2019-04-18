import * as types from '../constants/actionTypes';
import { formLocalizedNotification as message }  from '../localization/notifications';

const initialState = {
  list: {
    page: 1,
    search: null,
  },
  ticket: null,
  error: null,
  success: null,
  confirmed: false,
};


export default function (state = initialState, action) {

  switch (action.type) {
    case types.FETCH_TICKETS: {
      return {
        ...state,
        list: action.payload.data,
        error: null,
        success: null
      };
    }
    case types.SEARCH_TICKETS: {
      return {
        ...state,
        list: action.payload.data,
        error: null,
        success: null
      };
    }
    case types.FETCH_TICKET: {
      return {
        ...state,
        ticket: action.payload.data,
        error: null,
        success: null
      };
    }
    case types.UPDATE_TICKET: {
      return {
        ...state,
        ticket: {},
        error: null,
        success: message(
          action.payload.data.subject,
          action,
          'en'
        ),
        confirmed: false,
      };
    }
    case types.GENERAL_ERROR: {
      return {
        ...state,
        list: {
          page: 1,
          search: null,
        },
        ticket: null,
        error: message(
          null,
          action,
          'en'
        ),
        success: null,
        confirmed: false,
      };
    }
    case types.FETCH_ERROR: {
      return {
        ...state,
        list: {
          page: 1,
          search: null,
        },
        ticket: null,
        error: message(
          null,
          action,
          'en'
        ),
        success: null,
        confirmed: false,
      };
    }
    case types.CONFIRM_NOTIFICATION: {
      return {
        ...state,
        confirmed: true,
      }
    }
    default:
      return {
        ...state
      };
  }

}
