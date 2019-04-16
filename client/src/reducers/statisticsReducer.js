import * as types from '../constants/actionTypes';
import { formLocalizedNotification as message } from '../localization/notifications';

const initialState = {
  viewMode: null,
  viewBranch: null,
  viewGroup: null,
  permissions: {
    data: null,
    chartsStyle: {
      type: 'HBars',
      id: 1
    }
  },
  tickets: {
    data: null,
    months: 12,
    chartsStyle: {
      type: 'VBars',
      id: 0
    }
  },
  groups: {
    data: null,
    chartsStyle: {
      type: 'PieChart',
      id: 2
    }
  },
  messages: {
    data: null,
    months: 12,
    chartsStyle: {
      type: 'HBars',
      id: 1
    }
  },
  users: {
    data: null,
    months: 12,
    chartsStyle: {
      type: 'HBars',
      id: 1
    }
  },
  error: null,
  success: null,
  confirmed: false
};

export default function (state = initialState, action) {

  switch (action.type) {
    case types.FETCH_USERS_STATS: {
      return {
        ...state,
        viewMode: action.payload.data[0].view_mode,
        viewBranch: action.payload.data[0].branch_name,
        viewGroup: action.payload.data[0].group_name,
        users: {
          ...state.users,
          data: [action.payload.data[2]],
          months: action.payload.data[1].months
        }
      };
    }
    case types.FETCH_MESSAGES_STATS: {
      return {
        ...state,
        viewMode: action.payload.data[0].view_mode,
        viewBranch: action.payload.data[0].branch_name,
        viewGroup: action.payload.data[0].group_name,
        messages: {
          ...state.messages,
          data: [action.payload.data[2]],
          months: action.payload.data[1].months
        }
      };
    }
    case types.FETCH_GROUPS_STATS: {
      return {
        ...state,
        groups: {
          ...state.groups,
          data: [action.payload.data]
        }
      };
    }
    case types.FETCH_TICKETS_STATS: {
      return {
        ...state,
        viewMode: action.payload.data[0].view_mode,
        viewBranch: action.payload.data[0].branch_name,
        viewGroup: action.payload.data[0].group_name,
        tickets: {
          ...state.tickets,
          data: [action.payload.data[2]],
          months: action.payload.data[1].months
        }

      };
    }
    case types.FETCH_PERMISSIONS_STATS: {
      return {
        ...state,
        permissions: {
          ...state.permissions,
          data: [action.payload.data]
        }
      };
    }
    case types.SET_GROUPS_CHARTS_STYLE: {
      return {
        ...state,
        groups: {
          ...state.groups,
          chartsStyle: action.payload
        }
      };
    }
    case types.SET_MESSAGES_CHARTS_STYLE: {
      return {
        ...state,
        messages: {
          ...state.messages,
          chartsStyle: action.payload
        }
      };
    }
    case types.SET_PERMISSIONS_CHARTS_STYLE: {
      return {
        ...state,
        permissions: {
          ...state.permissions,
          chartsStyle: action.payload
        }
      };
    }
    case types.SET_USERS_CHARTS_STYLE: {
      return {
        ...state,
        users: {
          ...state.users,
          chartsStyle: action.payload
        }
      };
    }
    case types.SET_TICKETS_CHARTS_STYLE: {
      return {
        ...state,
        tickets: {
          ...state.tickets,
          chartsStyle: action.payload
        }
      };
    }
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

