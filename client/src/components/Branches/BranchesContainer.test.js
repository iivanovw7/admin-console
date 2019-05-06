import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { MemoryRouter, withRouter } from 'react-router-dom';
import * as mocks from '../../__mocks__/';
import { getSingleBranch } from '../../actions';
import BranchesContainer from '../../components/Branches/BranchesContainer';
import { Container } from '../../components/UI/ThemeProperties';
import { history, storeFactory } from '../../testUtils';

const setup = (initialState = {}) => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  let store = storeFactory(initialState);

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
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
};

setup();
