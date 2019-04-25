import { Table, TableBody, TableHead, withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { createMemoryHistory } from 'history';
import jest from 'jest-mock';
import React from 'react';
import * as mocks from '../../../__mocks__/';
import { BranchesContainerElement } from '../../../components/Branches/BranchesContainerElement';
import { Container } from '../../../components/UI/ThemeProperties';

const setup = () => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  const history = createMemoryHistory('/dashboard');

  const Composition = withStyles(Container, { withTheme: true })(BranchesContainerElement);

  const props = {
    row: mocks.BRANCH,
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
   *  Renders single branch container with styles
   */
  describe('Branch container element', () => {
    it('Should render branch container element with fields and styles', () => {
      const mockBranchClick = jest.fn();
      const mockDisplayStatus = jest.fn();
      wrapper = mount(
        <Table>
          <TableHead/>
          <TableBody>
            <Composition
              {...props}
              handleBranchClick={mockBranchClick}
              displayStatus={mockDisplayStatus}
            />
          </TableBody>
        </Table>
      );
      expect(wrapper.html()).not.toBe(null);
      expect(wrapper.length).toEqual(1);
      expect(wrapper.html()).toMatchSnapshot();

      //checking branch click event handling
      wrapper.find(BranchesContainerElement).simulate('click');
      expect(mockDisplayStatus).toHaveBeenCalled();
      expect(mockBranchClick).toHaveBeenCalled();
      expect(mockBranchClick).toHaveBeenCalledTimes(1);

    });
  });
};

setup();
