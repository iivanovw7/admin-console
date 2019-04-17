import * as types from '../constants/actionTypes';
import { formLocalizedNotification as message }  from '../localization/notifications';

const initialState = {
  list: {
    page: 1,
    search: null,
  },
  user: null,
  error: null,
  success: null,
  confirmed: false,
};

function displayStatus(status) {
  return status ? 'Active' : 'Disabled';
}

export default function (state = initialState, action) {

  switch (action.type) {
    case types.FETCH_USERS: {
      return {
        ...state,
        list: action.payload.data,
        error: null,
        success: null
      };
    }
    case types.SEARCH_USERS: {
      return {
        ...state,
        list: action.payload.data,
        error: null,
        success: null
      };
    }
    case types.FETCH_USER: {
      return {
        ...state,
        user: action.payload.data,
        error: null,
        success: null
      };
    }
    case types.UPDATE_USER: {
      return {
        ...state,
        user: {},
        error: null,
        success: message(
          action.payload.data.name + ' ' + action.payload.data.surname,
          action,
          'en'
        ),
        confirmed: false,
      };
    }
    case types.CHANGE_USER_STATUS: {
      return {
        ...state,
        error: null,
        success: message(
          action.payload.data.name + ' ' + action.payload.data.surname,
          action,
          'en',
          displayStatus(action.payload.data.active)
        ),
        confirmed: false,
      };
    }
    case types.ERROR: {
      return {
        ...state,
        list: {
          page: 1,
          search: null,
        },
        user: null,
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
        user: null,
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
