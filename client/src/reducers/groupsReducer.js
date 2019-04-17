import * as types from '../constants/actionTypes';
import { formLocalizedNotification as message }  from '../localization/notifications';

const initialState = {
  list: {
    page: 1
  },
  group: {},
  error: null,
  success: null,
  confirmed: false,
};

function displayStatus(status) {
  return status ? 'Active' : 'Disabled';
}

export default function (state = initialState, action) {

  switch (action.type) {
    case types.FETCH_GROUPS: {
      return {
        ...state,
        group: {},
        list: action.payload.data,
        error: null,
        success: null
      };
    }
    case types.FETCH_GROUP: {
      return {
        ...state,
        group: action.payload.data,
        error: null,
        success: null
      };
    }
    case types.ADD_GROUP: {
      return {
        ...state,
        group: {},
        error: null,
        success: message(
          action.payload.data.name,
          action,
          'en'
        ),
        confirmed: false,
      };
    }
    case types.UPDATE_GROUP: {
      return {
        ...state,
        group: {},
        error: null,
        success: message(
          action.payload.data.name,
          action,
          'en'
        ),
        confirmed: false,
      };
    }
    case types.DELETE_GROUP: {
      return {
        ...state,
        group: {},
        error: null,
        success: message(
          action.payload.data[1].removedGroup.name,
          action,
          'en'
        ),
        confirmed: false,
      };
    }
    case types.CHANGE_GROUP_STATUS: {
      return {
        ...state,
        group: {},
        error: null,
        success: message(
          action.payload.data.name,
          action,
          'en',
          displayStatus(action.payload.data.status)
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
        group: {},
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
        group: {},
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
