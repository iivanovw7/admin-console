import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { MemoryRouter, withRouter } from 'react-router-dom';
import * as mocks from '../../__mocks__/';
import { getSingleRole } from '../../actions';
import RolesContainer from '../../components/Roles/RolesContainer';
import { Container } from '../../components/UI/ThemeProperties';
import { history, storeFactory } from '../../testUtils';

const setup = (initialState = {}) => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  let store = storeFactory(initialState);
  const Composition = connect(
    null, { getSingleRole }
  )(withStyles(Container, { withTheme: true })(withRouter(RolesContainer)));

  const props = {
    roles: mocks.ROLES.output,
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
   *  Renders roles container with styles
   */
  describe('Roles container', () => {
    it('Should render roles container with fields and styles', () => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Composition {...props} />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
};

setup();
