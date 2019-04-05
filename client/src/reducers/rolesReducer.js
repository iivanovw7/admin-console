import * as types from '../constants/ActionTypes';

const initialState = {
  list: {
    page: 1
  },
  role: {},
  error: null,
  success: null
};

function displayStatus(status) {
  return (status) ? ('Active') : ('Disabled');
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
        list: {},
        role: action.payload.data,
        error: null,
        success: null
      };
    }
    case types.ADD_ROLE: {
      return {
        ...state,
        list: {},
        role: {},
        error: null,
        success: `New Role "${action.payload.data.name}" created!`
      };
    }
    case types.UPDATE_ROLE: {
      return {
        ...state,
        list: {},
        role: {},
        error: null,
        success: `Role "${action.payload.data.name}" successfully modified!`
      };
    }
    case types.DELETE_ROLE: {
      return {
        ...state,
        role: {},
        error: null,
        success: `Role "${action.payload.data[1].removedRole.name}" successfully removed!`
      };
    }
    case types.CHANGE_ROLE_STATUS: {
      return {
        ...state,
        role: {},
        error: null,
        success: `Role "${action.payload.data.newRole.name}" status changed to "${displayStatus(action.payload.data.newRole.active)}"!`
      };
    }
    case types.ERROR: {
      return {
        ...state,
        role: {},
        error: 'Error!',
        success: null
      };
    }
    case types.FETCH_ERROR: {
      return {
        ...state,
        list: {},
        role: {},
        error: 'Error while getting data!',
        success: null
      };
    }
    default:
      return {
        ...state
      };
  }

}
