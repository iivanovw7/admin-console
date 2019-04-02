import * as types from '../constants/ActionTypes';

const initialState = {
  list: {
    page: 1
  },
  branch: {},
  error: null,
  success: null
};

export default function (state = initialState, action) {

  switch (action.type) {
    case types.FETCH_BRANCHES:

      return {
        ...state,
        list: action.payload.data,
        branch: {},
        error: null,
        success: null
      };

    case types.FETCH_SINGLE_BRANCH:

      return {
        ...state,
        list: {},
        branch: action.payload.data,
        error: null,
        success: null
      };

    case types.ADD_BRANCH:

      return {
        ...state,
        list: {},
        branch: {},
        error: null,
        success: `New Branch ${action.payload.data} created!`
      };

    case types.FETCH_ERROR:
      return {
        ...state,
        list: {},
        branch: {},
        error: 'Error!',
        success: null
      };

    case types.ERROR:
      return {
        ...state,
        list: {},
        branch: {},
        error: 'Error!',
        success: null
      };

    default:
      return {
        ...state
      };
  }

}





