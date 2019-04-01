import * as types from '../constants/ActionTypes';

const initialState = {
  list: {},
  error: null,
};

export default function (state = initialState, action) {

  switch (action.type) {
    case types.FETCH_BRANCHES:

      return {
        ...state,
        list: action.payload.data,
        error: null,
      };

    case types.FETCH_SINGLE_BRANCH:

      return {
        ...state,
        list: action.payload.data,
        error: null,
      };

    case types.FETCH_ERROR:
      return {
        ...state,
        error: 'Error!'
      };

    default:
      return {
        ...state,
        error: 'Error!'
      };
  }

}

