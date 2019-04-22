import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import jest from 'jest-mock';
import React from 'react';
import SearchBar from '../../../components/UI/SearchBar';
import { NavigationStyles } from '../../../components/UI/ThemeProperties';
import { storeFactory } from '../../../testUtils';

const setup = (initialState = {}) => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  let store = storeFactory(initialState);

  const props = {
    tooltip: 'test',
    value: 'testing'
  };

  const Composition = withStyles(NavigationStyles, { withTheme: true })(SearchBar);

  beforeEach(() => {
    shallow = createShallow();
    shallowWithDive = createShallow({ dive: true });
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  describe('Should render Search bar with styles and functions', () => {

    it('Should render correct input field', () => {
      wrapper = mount(<Composition {...props} />);
      expect(wrapper.find('input')).not.toBe(undefined);
    });

    it('Should render with help icon', () => {
      wrapper = mount(<Composition {...props}/>);
      expect(wrapper.find('Icon').text()).toBe('help_outline');
    });

    it('Should render with correct value', () => {
      wrapper = mount(<Composition {...props}/>);
      expect(wrapper.find('input').prop('value')).toBe('testing');
    });

    it('Should render with correct tooltip', () => {
      wrapper = mount(<Composition {...props}/>);
      expect(wrapper.find('Tooltip').prop('title')).toBe('test');
    });

    it('Should handle onChange event', () => {
      const mockFunc = jest.fn();
      wrapper = mount(<Composition {...props} onSearchTermChange={mockFunc}/>);

      //changing input value directly
      wrapper.find(SearchBar).at(0).props().value = 'new query';
      expect(wrapper.find(SearchBar).at(0).props().value).toBe('new query');

      //simulating onChange value with input String
      wrapper.find('input').simulate('change', { target: { value: 'one more query' } });
      expect(mockFunc).toHaveBeenCalled();
      expect(mockFunc).toHaveBeenCalledWith('one more query');
    });

  });

};

setup();