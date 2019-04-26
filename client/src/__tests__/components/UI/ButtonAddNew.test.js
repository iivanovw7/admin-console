import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { createMemoryHistory } from 'history';
import jest from 'jest-mock';
import React from 'react';
import ButtonAddNew from '../../../components/UI/ButtonAddNew';
import { Buttons } from '../../../components/UI/ThemeProperties';

const setup = () => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  const history = createMemoryHistory('/dashboard');
  const Composition = withStyles(Buttons, { withTheme: true })(ButtonAddNew);
  const props = {
    history: history,
    element: 'test'
  };

  beforeEach(() => {
    shallow = createShallow();
    shallowWithDive = createShallow({ dive: true });
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  describe('Should render Button with styles and options', () => {

    it('Click handling', () => {
      const mockFunc = jest.fn();
      wrapper = mount(<Composition {...props} onClick={mockFunc()}/>);
      wrapper.find('button').at(0).simulate('click');
      expect(mockFunc).toHaveBeenCalled();
    });

    it('Should render components', () => {
      wrapper = mount(<Composition {...props} />);
      expect(wrapper.find('.ButtonAddNew-formRoot-4 WithStyles-ButtonAddNew--formRoot-1')).not.toBe(undefined);
    });

  });

};

setup();



