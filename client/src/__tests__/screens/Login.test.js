import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import jest from 'jest-mock';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import { LoginFormStyles } from '../../components/UI/ThemeProperties';
import Login from '../../screens/Login';
import { storeFactory } from '../../testUtils';
import { loginUser } from '../../actions';

const setup = (initialState = {}) => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  let store = storeFactory(initialState);

  const Form = reduxForm({ form: 'login', fields: ['email', 'password'] })(Login);
  const Composition = connect(null, { loginUser })(withStyles(LoginFormStyles, { withTheme: true })(Form));
  const props = {
    email: '',
    password: ''
  };

  beforeEach(() => {
    shallow = createShallow();
    shallowWithDive = createShallow({ dive: true });
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  describe('ExampleView', () => {
    it('Should render login form with fields and styles', () => {
      const mockFunc = jest.fn();
      wrapper = mount(
        <Provider store={store}>
          <Composition {...props} onSubmit={mockFunc()}/>
        </Provider>
      );

      expect(wrapper.html()).not.toBe(null);
      expect(wrapper.length).toEqual(1);

      wrapper.find(Login).at(0).props().value = 'email@test.com';
      expect(wrapper.find(Login).at(0).props().value).toBe('email@test.com');

      wrapper.find('input').first().simulate('change', { target: { value: 'email@test.com' } });
      expect(wrapper.find('input').first().props().value).toBe('email@test.com');
      wrapper.find('input').last().simulate('change', { target: { value: 'password' } });
      expect(wrapper.find('input').last().props().value).toBe('password');

      wrapper.find('button').last().simulate('click');
      expect(mockFunc).toHaveBeenCalled();
      expect(mockFunc).toHaveBeenCalledTimes(1);

    });
  });
};

setup();



