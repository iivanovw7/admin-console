import { IconButton, Snackbar, withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import jest from 'jest-mock';
import React from 'react';
import AlertSnackbar from '../../../components/UI/Notifications/Snackbar';
import { Notification } from '../../../components/UI/ThemeProperties';

let wrapper;
let shallowWithDive;
let mount;
let shallow;
const mockDispatch = jest.fn();
const mockAfterConfirm = jest.fn();
const props = {
  dispatch: mockDispatch,
  afterConfirm: mockAfterConfirm,
  success: true,
  message: 'TEST MESSAGE'
};
const Composition = withStyles(Notification, { withTheme: true })(AlertSnackbar);

beforeEach(() => {
  shallow = createShallow();
  shallowWithDive = createShallow({ dive: true });
  mount = createMount();
});

afterEach(() => {
  mount.cleanUp();
});

describe('Should render Snackbar popup with styles and functions', () => {

  it('Should render main Dialog', () => {
    wrapper = mount(<Composition {...props} />);
    expect(wrapper.find(Snackbar).length).toBe(1);
    expect(wrapper.at(0).props(0).success).toBe(true);
  });

  it('Should render component with correct text', () => {
    wrapper = mount(<Composition {...props} />);
    expect(typeof wrapper.find('span#client-snackbar').text()).toBe('string');
  });

  it('Should render confirmation button', () => {
    wrapper = mount(<Composition {...props} />);
    expect(wrapper.find(IconButton).length).toBe(1);
  });

  it('Should render confirmation button with click events', () => {
    wrapper = mount(<Composition {...props} />);
    expect(mockAfterConfirm).toHaveBeenCalledTimes(0);
    wrapper.find(IconButton).simulate('click');
    expect(mockAfterConfirm).toHaveBeenCalledTimes(1);
  });

  it('Should match snapshot', () => {
    wrapper = mount(<Composition {...props} />);
    expect(wrapper.html()).toMatchSnapshot();
  });

});

