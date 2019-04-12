import * as types from '../constants/actionTypes';
import { formLocalizedNotification as message } from '../localization/notifications';

const initialState = {
  viewMode: null,
  viewBranch: null,
  viewGroup: null,
  results: null,
  error: null,
  success: null,
  confirmed: false
};

/*
  permissions: null,
  tickets: null,
  groups: null,
  messages: null,

 */

export default function (state = initialState, action) {

  switch (action.type) {
    case types.ERROR: {
      return {
        ...state,
        message: {},
        error: message(
          null,
          action,
          'en'
        ),
        success: null,
        confirmed: false
      };
    }
    case types.FETCH_ERROR: {
      return {
        ...state,
        message: {},
        error: message(
          null,
          action,
          'en'
        ),
        success: null,
        confirmed: false
      };
    }
    case types.CONFIRM_NOTIFICATION: {
      return {
        ...state,
        confirmed: true
      };
    }
    default:
      return {
        ...state
      };
  }
}