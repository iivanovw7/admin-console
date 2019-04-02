import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import banchesReducer from './branchesReducer';

const rootReducer = combineReducers({
  branches: banchesReducer,
  form: formReducer,
  auth: authReducer
});

export default rootReducer;