import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { createMemoryHistory } from 'history';
import jest from 'jest-mock';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as mocks from '../../../__mocks__/';
import { addNewGroup, updateGroup } from '../../../actions';
import GroupContainer from '../../../components/Group/GroupContainer';
import { validateGroup } from '../../../components/UI/Forms/validate';
import { Container } from '../../../components/UI/ThemeProperties';
import { storeFactory } from '../../../testUtils';

const setup = (initialState = {}) => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  let store = storeFactory(initialState);
  const history = createMemoryHistory('/dashboard');

  //Splitting HOC components
  const Form = reduxForm({
    validate: validateGroup,
    asyncBlurFields: [], //to avoid error related to async validation
    form: 'group',
    fields: ['name', 'description', 'permissions', 'status']
  })(GroupContainer);

  const Composition = connect(null, {
    addNewGroup,
    updateGroup
  })(withStyles(Container, { withTheme: true })(Form));

  const props = {
    group: mocks.GROUP,
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
   *  Renders group form with styles, imitates users actions:
   *  clicks buttons and input fields
   */
  describe('Group Container', () => {
    it('Should render group form with styles', () => {
      const mockFunc = jest.fn();
      wrapper = mount(
        <Provider store={store}>
          <Composition {...props} onSubmit={mockFunc()}/>
        </Provider>
      );

      expect(wrapper.html()).not.toBe(null);
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('button[type="button"]').text()).toBe('CANCEL');
      expect(wrapper.find('button[type="submit"]').text()).toBe('SAVE');

      //Comparing rendered fields to mock data
      expect(wrapper.find(GroupContainer).at(0).props(0).group.name).toBe(mocks.GROUP.name);
      expect(wrapper.find(GroupContainer).at(0).props(0).group).toBe(mocks.GROUP);

      //Checking name input field
      wrapper.find('input#name').simulate('click');
      wrapper.find('input#name').simulate('change', { target: { value: 'email@test.com' } });
      expect(wrapper.find('input#name').props().value).toBe('email@test.com');

      //Checking description input field
      wrapper.find('textarea#description').simulate('click');
      wrapper.find('textarea#description').simulate('change', { target: { value: 'TEST' } });
      expect(wrapper.find('textarea#description').props().value).toBe('TEST');

      //checking submit event handling
      wrapper.find(GroupContainer).simulate('submit');
      expect(mockFunc).toHaveBeenCalled();
      expect(mockFunc).toHaveBeenCalledTimes(1);
    });
  });
};

setup();
