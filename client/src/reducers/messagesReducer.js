import * as types from '../constants/actionTypes';
import { formLocalizedNotification as message }  from '../localization/notifications';

const initialState = {
  list: {
    page: 1,
    search: null,
  },
  message: {},
  error: null,
  success: null,
  confirmed: false,
};


export default function (state = initialState, action) {

  switch (action.type) {
    case types.FETCH_MESSAGES: {
      return {
        ...state,
        message: {},
        list: action.payload.data,
        error: null,
        success: null
      };
    }
    case types.SEARCH_MESSAGES: {
      return {
        ...state,
        message: {},
        list: action.payload.data,
        error: null,
        success: null
      };
    }
    case types.FETCH_MESSAGE: {
      return {
        ...state,
        message: action.payload.data,
        error: null,
        success: null
      };
    }
    case types.UNDONE_MESSAGE: {
      return {
        ...state,
        message: {},
        error: message(
          null,
          action,
          'en'
        ),
        success: null,
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
        message: {},
        error: message(
          null,
          action,
          'en'
        ),
        success: null,
        confirmed: false,
      };
    }
    case types.ADD_MESSAGE: {
      return {
        ...state,
        message: {},
        error: null,
        success: message(
          action.payload.data.subject,
          action,
          'en'
        ),
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
        message: {},
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
