import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import jest from 'jest-mock';
import { createMemoryHistory } from 'history';
import React from 'react';
import { LogoutButton } from '../../../../components/UI/AppBar/LogoutButton';
import { NavigationStyles } from '../../../../components/UI/ThemeProperties';

const setup = () => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  const history = createMemoryHistory('/dashboard');
  const mockDispatch = jest.fn();
  const mockLogout = jest.fn();

  const props = {
    history: history,
    dispatch: mockDispatch,
    handleLogout: mockLogout
  };

  const Composition = withStyles(NavigationStyles, { withTheme: true })(LogoutButton);

  beforeEach(() => {
    shallow = createShallow();
    shallowWithDive = createShallow({ dive: true });
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  describe('Should render Logout Button styles and functions', () => {

    it('Should render component correctly field', () => {
      wrapper = mount(<Composition {...props} />);
      expect(wrapper.find('button')).not.toBe(undefined);
      expect(wrapper.find('button').html()).not.toBe(null);
      expect(wrapper.find('button').length).toEqual(1);
    });

    it('Should render with exit_to_app icon', () => {
      wrapper = mount(<Composition {...props}/>);
      expect(wrapper.find('Icon').text()).toBe('exit_to_app');
    });

    it('Should handle onClick event', () => {
      wrapper = mount(<Composition {...props} />);

      //simulating onClick value with input String
      wrapper.find('button').simulate('click');
      expect(mockLogout).toHaveBeenCalled();
      expect(mockLogout).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

    it('Should match snapshot', () => {
      wrapper = mount(<Composition {...props} />);
      expect(wrapper.html()).toMatchSnapshot();
    });

  });
};

setup();
