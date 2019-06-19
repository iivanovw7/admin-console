import { createStore } from 'redux';
import rootReducer from './reducers';
import configureMockStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';

/**
 * @param {object} initialState - initial state to store
 * @function storeFactory
 * @returns {Store} Redux store
 */
export const storeFactory = initialState => {
  return createStore(rootReducer, initialState);
};

//Mock browser history
export const history = createMemoryHistory('/dashboard');

//Mock store with middlewares
const middlewares = [thunk];
export const mockStore = configureMockStore(middlewares);

export const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

//Query parameters
export const limit = 10;
export const currentPage = 2;
export const page = 2;
