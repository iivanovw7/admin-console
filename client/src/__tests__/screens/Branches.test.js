import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { createMemoryHistory } from 'history';
import jest from 'jest-mock';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { MemoryRouter, withRouter } from 'react-router-dom';
import { getBranches } from '../../actions';
import { Wrapper } from '../../components/UI/ThemeProperties';
import Branches from '../../screens/Branches';
import { storeFactory } from '../../testUtils';
import * as mocks from './../../__mocks__/';

const history = createMemoryHistory('/dashboard');

const setup = (initialState = {}) => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  let store = storeFactory(initialState);

  const Composition = connect(null, { getBranches })(withStyles(Wrapper, { withTheme: true })(withRouter(Branches)));
  const props = {
    history: history,
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
    it('Should render HOC with styles properly', () => {
      const mockFunc = jest.fn();
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Composition {...props} dispatch={mockFunc}/>
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.html()).not.toBe(null);
      expect(wrapper.html()).not.toBe(undefined);
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('h2').text()).toBe('Branches');
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
};

setup();



