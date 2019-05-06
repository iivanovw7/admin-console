import { Dialog, Modal, withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import jest from 'jest-mock';
import React from 'react';
import Warning from '../Dialogs/Warning';
import { NavigationStyles } from '../ThemeProperties';

let wrapper;
let shallowWithDive;
let mount;
let shallow;
const mockRequest = jest.fn();
const mockClose = jest.fn();
const props = {
  message: 'TEST MESSAGE',
  request: mockRequest,
  close: mockClose,
  mainText: 'TEST TEXT',
  opened: true
};
const Composition = withStyles(NavigationStyles, { withTheme: true })(Warning);

beforeEach(() => {
  shallow = createShallow();
  shallowWithDive = createShallow({ dive: true });
  mount = createMount();
});

afterEach(() => {
  mount.cleanUp();
});

describe('Should render Warning popup with styles and functions', () => {

  it('Should render main Dialog', () => {
    wrapper = mount(<Composition {...props} />);
    expect(wrapper.find(Dialog).length).toBe(1);
    expect(wrapper.at(0).props(0).opened).toBe(true);
  });

  it('Should render main Modal window', () => {
    wrapper = mount(<Composition {...props} />);
    expect(wrapper.find(Modal).length).toBe(1);
    expect(wrapper.at(0).props(0).opened).toBe(true);
  });

  it('Should render component with correct text', () => {
    wrapper = mount(<Composition {...props} />);
    expect(wrapper.at(0).props(0).opened).toBe(true);
    expect(wrapper.find('DialogTitle').text()).toBe('TEST TEXT');
    expect(wrapper.find('p#alert-dialog-description').text()).toBe('TEST MESSAGE');
  });

  it('Should render buttons with onClick events', () => {
    wrapper = mount(<Composition {...props} />);
    expect(mockClose).toHaveBeenCalledTimes(0);
    expect(mockRequest).toHaveBeenCalledTimes(0);
    wrapper.find('button').first().simulate('click');
    expect(mockClose).toHaveBeenCalled();
    expect(mockClose).toHaveBeenCalledTimes(1);
    wrapper.find('button').last().simulate('click');
    expect(mockRequest).toHaveBeenCalledTimes(1);
  });

  it('Should match snapshot', () => {
    wrapper = mount(<Composition {...props} />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
