import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { createMemoryHistory } from 'history';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { MemoryRouter, withRouter } from 'react-router-dom';
import * as mocks from '../../../__mocks__/';
import { getSingleBranch } from '../../../actions';
import BranchesContainer from '../../../components/Branches/BranchesContainer';
import { Container } from '../../../components/UI/ThemeProperties';
import { storeFactory } from '../../../testUtils';

const setup = (initialState = {}) => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  let store = storeFactory(initialState);
  const history = createMemoryHistory('/dashboard');

  const Composition = connect(
    null, { getSingleBranch }
  )(withStyles(Container, { withTheme: true })(withRouter(BranchesContainer)));

  const props = {
    branches: mocks.BRANCHES.output,
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
   *  Renders branches container with styles
   */
  describe('Branches container', () => {
    it('Should render branches container with fields and styles', () => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Composition {...props} />
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
