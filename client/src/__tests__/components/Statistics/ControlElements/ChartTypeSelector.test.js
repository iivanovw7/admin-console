import { Select, withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { createMemoryHistory } from 'history';
import jest from 'jest-mock';
import React from 'react';
import { ChartTypeSelector } from '../../../../components/Statistics/Chart/ControlElements/ChartTypeSelector';
import { Container } from '../../../../components/UI/ThemeProperties';
import { ChartsComponents } from '../../../../constants/chartsStyles';
import * as mocks from './../../../../__mocks__/';

const setup = () => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  const mockOnSelect = jest.fn();
  const history = createMemoryHistory('/dashboard');
  const Composition = withStyles(Container, { withTheme: true })(ChartTypeSelector);

  const props = {
    dataType: 'Users',
    history: history,
    handleSelect: mockOnSelect,
    options: ChartsComponents,
    option: mocks.style
  };

  beforeEach(() => {
    shallow = createShallow();
    shallowWithDive = createShallow({ dive: true });
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  describe('Should render Selector with styles and options', () => {

    it('Should render title', () => {
      wrapper = mount(<Composition {...props} />);
      expect(wrapper.find('label').text()).toBe('Chart');
    });

    it('Should render component', () => {
      wrapper = mount(<Composition {...props} />);
      expect(wrapper.find(ChartTypeSelector).html()).not.toBe(undefined);
      expect(wrapper.find(ChartTypeSelector).html()).not.toBe(null);
      expect(wrapper.find(ChartTypeSelector).length).toEqual(1);
    });

    it('Should render input field ', () => {
      wrapper = mount(<Composition {...props} />);
      expect(wrapper.find('input').html()).not.toBe(undefined);
      expect(wrapper.find('input').html()).not.toBe(null);
      expect(wrapper.find('input').length).toEqual(1);
    });

    it('Should render with correct preselected value', () => {
      wrapper = mount(<Composition {...props}/>);
      expect(wrapper.find('input').prop('value')).toBe(2);
      expect(wrapper.find(Select).prop('value')).toBe(2);
    });

    it('Should handle onChange event', () => {
      wrapper = shallowWithDive(<Composition {...props} />);
      wrapper.find(Select).simulate('change', 3);
      expect(mockOnSelect).toHaveBeenCalled();
      expect(mockOnSelect).toHaveBeenCalledTimes(1);
      expect(mockOnSelect).toHaveBeenCalledWith(3);
    });

  });
};

setup();



