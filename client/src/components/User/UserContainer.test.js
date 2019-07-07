import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { createMemoryHistory } from 'history';
import jest from 'jest-mock';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
  getBranches,
  getGroups,
  getRoles,
  updateUser
} from '../../actions';
import UserContainer from '../../components/User/UserContainer';
import { validateBranch } from '../../utils/formsValidator';
import { Container } from '../../components/UI/ThemeProperties';
import { storeFactory, history } from '../../testUtils';
import * as mocks from '../../__mocks__/';

const setup = (initialState = {}) => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  let store = storeFactory(initialState);

  //Splitting HOC components
  const Form = reduxForm({
    validate: validateBranch,
    asyncBlurFields: [], //to avoid error related to async validation
    form: 'user',
    fields: ['group', 'branch', 'role', 'status']
  })(UserContainer);

  const Composition = connect(null, {
    updateUser,
    getRoles,
    getGroups,
    getBranches
  })(withStyles(Container, { withTheme: true })(Form));

  const props = {
    user: mocks.USER,
    branches: mocks.BRANCHES.output,
    groups: mocks.GROUPS.output,
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
   *  Renders user form with styles, imitates users actions:
   *  clicks buttons and input fields
   */
  describe('User Container', () => {
    it('Should render user form with styles', () => {
      const mockFunc = jest.fn();
      wrapper = mount(
        <Provider store={store}>
          <Composition {...props} onSubmit={mockFunc()} />
        </Provider>
      );
      expect(wrapper.length).toEqual(1);

      //Comparing rendered fields to mock data
      expect(wrapper.find(UserContainer).at(0).props(0).user.email).toBe(mocks.USER.email);
      expect(wrapper.find(UserContainer).at(0).props(0).user).toBe(mocks.USER);

      //Check current fields
      expect(wrapper.find('#select-role').text()).toBe(mocks.USER.role.name);
      expect(wrapper.find('#select-group').text()).toBe(mocks.USER.group.name);
      expect(wrapper.find('#select-branch').text()).toBe(mocks.USER.branch.name);

      //checking submit event handling
      wrapper.find(UserContainer).simulate('submit');
      expect(mockFunc).toHaveBeenCalledTimes(1);

    });
  });
};

setup();
