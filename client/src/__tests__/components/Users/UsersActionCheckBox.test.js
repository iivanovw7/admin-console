import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { createMemoryHistory } from 'history';
import jest from 'jest-mock';
import React from 'react';
import { Container } from '../../../components/UI/ThemeProperties';
import { actionCheckBox } from '../../../components/Users/UsersActionCheckBox';
import * as mocks from './../../../__mocks__/';

const setup = () => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  const history = createMemoryHistory('/dashboard');
  const mockFunc = jest.fn();

  const props = {
    history: history,
    row: mocks.USER
  };

  const Composition = withStyles(Container, { withTheme: true })(actionCheckBox);

  beforeEach(() => {
    shallow = createShallow();
    shallowWithDive = createShallow({ dive: true });
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  describe('Should render users action checkbox', () => {

    it('Should render components of correct type', () => {
      wrapper = mount(<Composition {...props}/>);
      expect(wrapper.find('select')).not.toBe(undefined);
    });

    it('Should handle events', () => {
      wrapper = mount(<Composition {...props} onChange={mockFunc()}/>);

      //changing input value directly
      wrapper.find(actionCheckBox).at(0).props().value = true;
      expect(wrapper.find(actionCheckBox).at(0).props().value).toBe(true);

      //simulating onChange value
      wrapper.find(actionCheckBox).simulate('click');
      expect(mockFunc).toHaveBeenCalled();
      expect(mockFunc).toHaveBeenCalledTimes(1);
    });

    it('Should match snapshot ', () => {
      wrapper = mount(<Composition {...props}/>);
      expect(wrapper.html()).toMatchSnapshot();
    });

  });

};

setup();
