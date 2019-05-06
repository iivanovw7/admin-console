import { Icon, withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import jest from 'jest-mock';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { MemoryRouter, withRouter } from 'react-router-dom';
import { logoutUser } from '../../../actions';
import AppBarContainer from '../AppBar/AppBarContainer';
import { NavigationStyles } from '../ThemeProperties';
import { history, storeFactory } from '../../../testUtils';

const setup = (initialState = {}) => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  let store = storeFactory(initialState);

  const Composition = connect(
    null, { logoutUser }
  )(withStyles(NavigationStyles, { withTheme: true })(withRouter(AppBarContainer)));

  const props = {
    history: history
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
   *  Renders AppBar container with styles
   */
  describe('AppBar container', () => {
    it('Should render AppBar container with fields and styles', () => {
      const mockFunc = jest.fn();
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Composition {...props} dispatch={mockFunc}/>
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(Icon).text()).toBe('exit_to_app');
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
};

setup();
