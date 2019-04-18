import checkPropTypes from 'check-prop-types';
import { createStore } from 'redux';
import rootReducer from './reducers';

/**
 * @param {object} initialState - initial state to store
 * @function storeFactory
 * @returns {Store} Redux store
 */
export const storeFactory = initialState => {
  return createStore(rootReducer, initialState);
};

/**
 * Returns node(s) with the given test attributes
 * @param {object} wrapper - shallow wrapper
 * @param {string} val - data-test attribute to find
 * @returns {wrapper}
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};