import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import branchesReducer from './branchesReducer';
import groupsReducer from './groupsReducer';
import rolesReducer from './rolesReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  branches: branchesReducer,
  groups: groupsReducer,
  roles: rolesReducer,
  users: usersReducer,
});

export default rootReducer;