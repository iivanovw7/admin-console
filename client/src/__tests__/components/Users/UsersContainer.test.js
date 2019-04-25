import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { createMemoryHistory } from 'history';
import jest from 'jest-mock';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { MemoryRouter, withRouter } from 'react-router-dom';
import { getUsers } from '../../../actions';
import { Container } from '../../../components/UI/ThemeProperties';
import UsersContainer from '../../../components/Users/UsersContainer';
import { storeFactory } from '../../../testUtils';
import * as mocks from './../../../__mocks__/';

const setup = (initialState = {}) => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  let store = storeFactory(initialState);
  const history = createMemoryHistory('/dashboard');

  const Composition = connect(null, { getUsers })(withStyles(Container, { withTheme: true })(withRouter(UsersContainer)));
  const props = {
    limit: 10,
    page: 2,
    search: mocks.USER.name,
    history: history,
    users: mocks.USERS.output
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
   *  Renders users container with styles,
   *  Checks if component rendered properly.
   */
  describe('Users container', () => {
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
      expect(wrapper.length).toEqual(1);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
};

setup();



