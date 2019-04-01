import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './AuthReducer';
import branches from './BranchesReducer';

const rootReducer = combineReducers({
  branches,
  form: formReducer,
  auth: authReducer,
});

export default rootReducer;