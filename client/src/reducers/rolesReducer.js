import * as types from '../constants/ActionTypes';
import { formLocalizedNotification as message }  from '../localization/notifications';

const initialState = {
  list: {
    page: 1
  },
  role: {},
  error: null,
  success: null,
  confirmed: false,
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
        success: message(
          action.payload.data.name,
          action,
          'en'
        ),
        confirmed: false,
      };
    }
    case types.UPDATE_ROLE: {
      return {
        ...state,
        role: {},
        error: null,
        success: message(
          action.payload.data.name,
          action,
          'en'
        ),
        confirmed: false,
      };
    }
    case types.DELETE_ROLE: {
      return {
        ...state,
        role: {},
        error: null,
        success: message(
          action.payload.data[1].removedRole.name,
          action,
          'en'
        ),
        confirmed: false,
      };
    }
    case types.CHANGE_ROLE_STATUS: {
      return {
        ...state,
        role: {},
        error: null,
        success: message(
          action.payload.data.newRole.name,
          action,
          'en',
          displayStatus(action.payload.data.newRole.active)
        ),
        confirmed: false,
      };
    }
    case types.ERROR: {
      return {
        ...state,
        list: {
          page: 1
        },
        role: {},
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
          page: 1
        },
        role: {},
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
