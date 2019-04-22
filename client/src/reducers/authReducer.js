import * as types from '../constants/actionTypes';
import Cookies from 'js-cookie';

const initialState = {
  user: {
    authenticated: typeof Cookies.get('LoggedUserObject') !== 'undefined',
    loggedUserObject: Cookies.getJSON('LoggedUserObject')
  },
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.AUTHENTICATED: {
      return {
        ...state,
        user: {
          ...state.user,
          authenticated: true,
          loggedUserObject: action.payload.data
        },
        error: null
      };
    }
    case types.UNAUTHENTICATED: {
      return {
        ...state,
        user: {
          ...state.user,
          authenticated: false,
          loggedUserObject: null
        },
        error: null
      };
    }
    case types.AUTHENTICATION_ERROR: {
      return {
        ...state,
        error: 'Authentication error!'
      };
    }
    default:
      return {
        ...state
      };
  }
}