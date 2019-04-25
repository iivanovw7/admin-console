import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import jest from 'jest-mock';
import React from 'react';
import { Buttons } from '../../../components/UI/ThemeProperties';
import { deleteButton } from '../../../components/Roles/RolesDeleteButton';

const setup = () => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  const Composition = withStyles(Buttons, { withTheme: true })(deleteButton);

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
      wrapper = mount(<Composition handleDeleteAction={mockFunc()}/>);
      wrapper.find('button').at(0).simulate('click');
      expect(mockFunc).toHaveBeenCalled();
    });

    it('Should render components', () => {
      wrapper = mount(<Composition />);
      expect(wrapper.text()).toBe('Delete');
    });

  });
};

setup();



