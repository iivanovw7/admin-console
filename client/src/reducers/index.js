import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import branchesReducer from './branchesReducer';
import groupsReducer from './groupsReducer';
import rolesReducer from './rolesReducer';
import statisticsReducer from './statisticsReducer';
import usersReducer from './usersReducer';
import ticketsReducer from './ticketsReducer';
import messagesReducer from './messagesReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  branches: branchesReducer,
  groups: groupsReducer,
  roles: rolesReducer,
  users: usersReducer,
  tickets: ticketsReducer,
  messages: messagesReducer,
  stats: statisticsReducer
});

export default rootReducer;