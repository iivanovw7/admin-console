import * as types from '../constants/ActionTypes';
import { formLocalizedNotification as message }  from '../localization/notifications';

const initialState = {
  list: {
    page: 1
  },
  branch: {},
  error: null,
  fetchError: null,
  success: null,
  confirmed: false,
};

export default function (state = initialState, action) {

  switch (action.type) {
    case types.FETCH_BRANCHES: {
      return {
        ...state,
        branch: {},
        list: action.payload.data,
        error: null,
        success: null
      };
    }
    case types.FETCH_BRANCH: {
      return {
        ...state,
        branch: action.payload.data,
        error: null,
        success: null
      };
    }
    case types.ADD_BRANCH: {
      return {
        ...state,
        branch: {},
        error: null,
        success: message(
          action.payload.data.name,
          action,
          'en'
        ),
        confirmed: false,
      };
    }
    case types.UPDATE_BRANCH: {
      return {
        ...state,
        branch: {},
        error: null,
        success: message(
          action.payload.data.name,
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
          page: 1
        },
        branch: {},
        error: message(
          null,
          action,
          'en'
        ),
        success: null,
        confirmed: false,
      };
    }
    case types.ERROR: {
      return {
        ...state,
        list: {
          page: 1
        },
        branch: {},
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
