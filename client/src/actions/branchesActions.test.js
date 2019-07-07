import moxios from 'moxios';
import * as mocks from '../__mocks__/';
import { addNewBranch, getBranches, getSingleBranch, updateBranch } from '../actions';
import * as types from '../constants/actionTypes';
import { headers, history, mockStore, limit, currentPage } from '../testUtils';

describe('BRANCH actions', () => {

  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  /**
   *  Dispatching getBranches, then imitating response 200 with data,
   *  Comparing action type and payload to expected ones.
   */
  it('Fetches one page ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        headers,
        response: mocks.BRANCHES
      });
    });

    const expectedActions = [
      { type: types.FETCH_BRANCHES }
    ];
    const store = mockStore({
      branch: {},
      list: {},
      error: null,
      success: null
    });

    return store.dispatch(getBranches(currentPage, limit, history)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0].payload.data).toEqual(mocks.BRANCHES);
      expect(storeActions[0].type).toBe(expectedActions[0].type);
    });
  });

  /**
   *  Dispatching getSingleBranch, then imitating response 200
   *  and comparing action type to expected one.
   */
  it('Fetches single branch ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        headers,
        response: mocks.BRANCH
      });
    });

    const expectedActions = [
      { type: types.FETCH_BRANCH }
    ];
    const store = mockStore({
      branch: {},
      list: {},
      error: null,
      success: null
    });

    return store.dispatch(getSingleBranch(mocks.BRANCH._id, history)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0].payload.data).toEqual(mocks.BRANCH);
      expect(storeActions[0].type).toBe(expectedActions[0].type);
    });

  });

  /**
   *  Dispatching updateBranch, then imitating response 200 and data
   *  Comparing action type data to expected ones.
   */
  it('Updates single branch ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        headers,
        response: mocks.BRANCH
      });
    });

    const expectedActions = [
      { type: types.UPDATE_BRANCH }
    ];
    const store = mockStore({
      branch: {},
      error: null,
      success: null,
      confirmed: false
    });

    return store.dispatch(updateBranch(mocks.BRANCH, mocks.BRANCH._id, history)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0].payload.data).toEqual(mocks.BRANCH);
      expect(storeActions[0].type).toBe(expectedActions[0].type);
    });
  });

  /**
   *  Dispatching addNewBranch, then imitating response 200 and data
   *  Comparing action type data to expected ones.
   */
  it('Add single branch ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        headers,
        response: mocks.BRANCH
      });
    });

    const expectedActions = [
      { type: types.ADD_BRANCH }
    ];
    const store = mockStore({
      branch: {},
      error: null,
      success: null,
      confirmed: false
    });

    return store.dispatch(addNewBranch(mocks.BRANCH, history)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0].payload.data).toEqual(mocks.BRANCH);
      expect(storeActions[0].type).toBe(expectedActions[0].type);
    });
  });

});
