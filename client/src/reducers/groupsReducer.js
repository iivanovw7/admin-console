import * as types from '../constants/ActionTypes';

const initialState = {
  list: {
    page: 1
  },
  group: {},
  error: null,
  success: null
};

function displayStatus(status) {
  return (status) ? ('Active') : ('Disabled');
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
        list: {},
        group: action.payload.data,
        error: null,
        success: null
      };
    }
    case types.ADD_GROUP: {
      return {
        ...state,
        list: {},
        group: {},
        error: null,
        success: `New Group "${action.payload.data.name}" created!`
      };
    }
    case types.UPDATE_GROUP: {
      return {
        ...state,
        list: {},
        group: {},
        error: null,
        success: `Group "${action.payload.data.name}" successfully modified!`
      };
    }
    case types.DELETE_GROUP: {
      return {
        ...state,
        group: {},
        error: null,
        success: `Group "${action.payload.data[1].removedGroup.name}" successfully removed!`
      };
    }
    case types.CHANGE_GROUP_STATUS: {
      return {
        ...state,
        group: {},
        error: null,
        success: `Group "${action.payload.data.name}" status changed to "${displayStatus(action.payload.data.status)}"!`
      };
    }
    case types.FETCH_ERROR: {
      return {
        ...state,
        list: {},
        group: {},
        error: 'Error while getting data!',
        success: null
      };
    }
    case types.ERROR: {
      return {
        ...state,
        list: {},
        group: {},
        error: 'Error!',
        success: null
      };
    }
    default:
      return {
        ...state
      };
  }

}
