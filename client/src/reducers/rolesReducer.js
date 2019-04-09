import * as types from '../constants/ActionTypes';
import { formLocalizedNotification as message }  from '../localization/notifications';

const initialState = {
  list: {
    page: 1
  },
  role: {},
  error: null,
  success: null
};

function displayStatus(status) {
  return status ? 'Active' : 'Disabled';
}

export default function (state = initialState, action) {

  switch (action.type) {
    case types.FETCH_ROLES: {
      return {
        ...state,
        list: action.payload.data,
        role: {},
        error: null,
        success: null
      };
    }
    case types.FETCH_ROLE: {
      return {
        ...state,
        role: action.payload.data,
        error: null,
        success: null
      };
    }
    case types.ADD_ROLE: {
      return {
        ...state,
        role: {},
        error: null,
        success: message(action.payload.data.name, action, 'en')
      };
    }
    case types.UPDATE_ROLE: {
      return {
        ...state,
        role: {},
        error: null,
        success: message(action.payload.data.name, action, 'en')
      };
    }
    case types.DELETE_ROLE: {
      return {
        ...state,
        role: {},
        error: null,
        success: message(action.payload.data[1].removedRole.name, action, 'en')
      };
    }
    case types.CHANGE_ROLE_STATUS: {
      return {
        ...state,
        role: {},
        error: null,
        success: message(action.payload.data.newRole.name, action, 'en', displayStatus(action.payload.data.newRole.active)),
      };
    }
    case types.ERROR: {
      return {
        ...state,
        list: {
          page: 1
        },
        role: {},
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
        role: {},
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
