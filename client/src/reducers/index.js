import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import branchesReducer from './branchesReducer';
import groupsReducer from './groupsReducer';
import rolesReducer from './rolesReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  branches: branchesReducer,
  groups: groupsReducer,
  roles: rolesReducer
});

export default rootReducer;