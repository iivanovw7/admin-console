import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import jest from 'jest-mock';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as mocks from '../../__mocks__/';
import { addNewRole, updateRole } from '../../actions';
import RoleContainer from '../../components/Role/RoleContainer';
import { Container } from '../../components/UI/ThemeProperties';
import { history, storeFactory } from '../../testUtils';
import { validateRole } from '../../utils/formsValidator';

const setup = (initialState = {}) => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  let store = storeFactory(initialState);

  //Splitting HOC components
  const Form = reduxForm({
    validate: validateRole,
    asyncBlurFields: [], //to avoid error related to async validation
    form: 'role',
    fields: ['name', 'code', 'description', 'active', 'public', 'editable']
  })(RoleContainer);

  const Composition = connect(null, {
    addNewRole,
    updateRole
  })(withStyles(Container, { withTheme: true })(Form));

  const props = {
    role: mocks.ROLE,
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
   *  Renders role form with styles, imitates users actions:
   *  clicks buttons and input fields
   */
  describe('Role Container', () => {
    it('Should render role form with styles', () => {
      const mockFunc = jest.fn();
      wrapper = mount(
        <Provider store={store}>
          <Composition {...props} onSubmit={mockFunc()}/>
        </Provider>
      );
      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.find('button[type="button"]').text()).toBe('CANCEL');
      expect(wrapper.find('button[type="submit"]').text()).toBe('SAVE');

      //Comparing rendered fields to mock data
      expect(wrapper.find(RoleContainer).at(0).props(0).role.name).toBe(mocks.ROLE.name);
      expect(wrapper.find(RoleContainer).at(0).props(0).role).toBe(mocks.ROLE);

      //Checking name input field
      wrapper.find('input#name').simulate('click');
      wrapper.find('input#name').simulate('change', { target: { value: 'TEST' } });
      expect(wrapper.find('input#name').props().value).toBe('TEST');

      //Checking code input field
      wrapper.find('input#code').simulate('click');
      wrapper.find('input#code').simulate('change', { target: { value: 'CODE' } });
      expect(wrapper.find('input#code').props().value).toBe('CODE');

      //Checking description input field
      wrapper.find('textarea#description').simulate('click');
      wrapper.find('textarea#description').simulate('change', { target: { value: 'TEST DESCRIPTION' } });
      expect(wrapper.find('textarea#description').props().value).toBe('TEST DESCRIPTION');

      //checking submit event handling
      wrapper.find(RoleContainer).simulate('submit');
      expect(mockFunc).toHaveBeenCalled();
    });
  });
};

setup();
