import * as types from '../constants/ActionTypes';
import { formLocalizedNotification as message }  from '../localization/notifications';

const initialState = {
  list: {
    page: 1
  },
  group: {},
  error: null,
  success: null
};

function displayStatus(status) {
  return status ? 'Active' : 'Disabled';
}

export default function (state = initialState, action) {

  switch (action.type) {
    case types.FETCH_GROUPS: {
      return {
        ...state,
        list: action.payload.data,
        group: {},
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
        success: message(action.payload.data.name, action, 'en')
      };
    }
    case types.UPDATE_GROUP: {
      return {
        ...state,
        group: {},
        error: null,
        success: message(action.payload.data.name, action, 'en')
      };
    }
    case types.DELETE_GROUP: {
      return {
        ...state,
        group: {},
        error: null,
        success: message(action.payload.data[1].removedGroup.name, action, 'en')
      };
    }
    case types.CHANGE_GROUP_STATUS: {
      return {
        ...state,
        group: {},
        error: null,
        success: message(action.payload.data.name, action, 'en', displayStatus(action.payload.data.status)),
      };
    }
    case types.ERROR: {
      return {
        ...state,
        list: {
          page: 1
        },
        group: {},
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
        group: {},
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
