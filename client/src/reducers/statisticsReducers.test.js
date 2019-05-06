import * as mocks from '../__mocks__/';
import * as types from '../constants/actionTypes';
import statisticsReducer from '../reducers/statisticsReducer';

const setup = (initialState = {}) => {

  describe('STATISTICS reducers', () => {

    it('FETCH USERS STATISTICS', () => {
      const expectedActions = {
        type: types.FETCH_USERS_STATS,
        payload: {
          data: mocks.STATS_USERS,
        }
      };

      expect(statisticsReducer(initialState, expectedActions)).toEqual({
        viewMode: expectedActions.payload.data[0].view_mode,
        viewBranch: expectedActions.payload.data[0].branch_name,
        viewGroup: expectedActions.payload.data[0].group_name,
        users: {
          data: [expectedActions.payload.data[2]],
          months: expectedActions.payload.data[1].months
        }
      });
    });

    it('FETCH GROUPS STATISTICS', () => {
      const expectedActions = {
        type: types.FETCH_GROUPS_STATS,
        payload: {
          data: mocks.STATS_GROUPS
        }
      };

      expect(statisticsReducer(initialState, expectedActions)).toEqual({
        groups: {
          data: [expectedActions.payload.data]
        }
      });
    });

    it('FETCH PERMISSIONS STATISTICS', () => {
      const expectedActions = {
        type: types.FETCH_PERMISSIONS_STATS,
        payload: {
          data: mocks.STATS_PERMISSIONS
        }
      };

      expect(statisticsReducer(initialState, expectedActions)).toEqual({
        permissions: {
          data: [expectedActions.payload.data]
        }
      });
    });

    it('FETCH TICKETS STATISTICS', () => {
      const expectedActions = {
        type: types.FETCH_TICKETS_STATS,
        payload: {
          data: mocks.STATS_TICKETS
        }
      };

      expect(statisticsReducer(initialState, expectedActions)).toEqual({
        viewMode: expectedActions.payload.data[0].view_mode,
        viewBranch: expectedActions.payload.data[0].branch_name,
        viewGroup: expectedActions.payload.data[0].group_name,
        tickets: {
          data: [expectedActions.payload.data[2]],
          months: expectedActions.payload.data[1].months
        }
      });
    });

    it('FETCH MESSAGES STATISTICS', () => {
      const expectedActions = {
        type: types.FETCH_MESSAGES_STATS,
        payload: {
          data: mocks.STATS_MESSAGES
        }
      };

      expect(statisticsReducer(initialState, expectedActions)).toEqual({
        viewMode: expectedActions.payload.data[0].view_mode,
        viewBranch: expectedActions.payload.data[0].branch_name,
        viewGroup: expectedActions.payload.data[0].group_name,
        messages: {
          data: [expectedActions.payload.data[2]],
          months: expectedActions.payload.data[1].months
        }
      });
    });

  });
};

setup();
