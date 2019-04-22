import * as types from '../../constants/actionTypes';
import branchesReducer from '../../reducers/branchesReducer';
import * as mocks from './../../__mocks__/';

const setup = () => {

  describe('BRANCH reducers', () => {

    it('FETCH BRANCHES', () => {
      const expectedActions = {
        type: types.FETCH_BRANCHES,
        payload: {
          data: mocks.BRANCHES
        }
      };

      expect(branchesReducer({}, expectedActions)).toMatchSnapshot();
    });

    it('FETCH BRANCH', () => {
      const expectedActions = {
        type: types.FETCH_BRANCH,
        payload: {
          data: mocks.BRANCH
        }
      };

      expect(branchesReducer({}, expectedActions)).toMatchSnapshot();
    });

    it('UPDATE BRANCH', () => {
      const expectedActions = {
        type: types.UPDATE_BRANCH,
        payload: {
          data: mocks.BRANCH
        }
      };

      expect(branchesReducer({}, expectedActions)).toMatchSnapshot();
    });

    it('ADD BRANCH', () => {
      const expectedActions = {
        type: types.ADD_BRANCH,
        payload: {
          data: mocks.BRANCH
        }
      };

      expect(branchesReducer({}, expectedActions)).toMatchSnapshot();
    });

  });

};

setup();