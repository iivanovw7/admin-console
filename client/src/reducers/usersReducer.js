import * as types from '../constants/ActionTypes';
import { formLocalizedNotification as message }  from '../localization/notifications';

const initialState = {
  list: {
    page: 1
  },
  user: null,
  error: null,
  success: null
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
        user: null,
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
        user: null,
        error: null,
        success: message(action.payload.data.name + ' ' + action.payload.data.surname, action, 'en')
      };
    }
    case types.CHANGE_USER_STATUS: {
      return {
        ...state,
        user: null,
        error: null,
        success: message(action.payload.data.name + ' ' + action.payload.data.surname, action, 'en', displayStatus(action.payload.data.active))
      };
    }
    case types.ERROR: {
      return {
        ...state,
        list: {
          page: 1
        },
        user: null,
        error: message(null, action, 'en'),
        success: null
      };
    }
    case types.FETCH_ERROR: {
      return {
        ...state,
        list: {
          page: 1
        },
        user: null,
        error: message(null, action, 'en'),
        success: null
      };
    }
    default:
      return {
        ...state
      };
  }

}
