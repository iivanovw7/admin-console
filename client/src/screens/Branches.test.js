import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import jest from 'jest-mock';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, withRouter } from 'react-router-dom';
import * as mocks from '../__mocks__/';
import { Wrapper } from '../components/UI/ThemeProperties';
import Branches from '../screens/Branches';
import { mockStore } from '../testUtils';

const setup = (initialState = mockStore({})) => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  const mockFunc = jest.fn();
  const Composition = withStyles(Wrapper, { withTheme: true })(withRouter(Branches));
  const props = {
    dispatch: mockFunc,
    branches: mocks.BRANCHES
  };

  beforeEach(() => {
    shallow = createShallow();
    shallowWithDive = createShallow({ dive: true });
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  /**
   *  Renders branches main screen form with styles,
   *  Checks if component rendered properly.
   */
  describe('Branches screen', () => {
    it('Should match snapshot', () => {
      wrapper = shallow(
        <Provider store={initialState}>
          <MemoryRouter>
            <Composition {...props} dispatch={mockFunc}/>
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.length).toEqual(1);
      expect(wrapper).toMatchSnapshot();
    });
  });
};

setup();
