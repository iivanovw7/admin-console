import { withStyles } from '@material-ui/core/styles';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { Selector } from '../../../components/UI/Selector.jsx';
import { Wrapper } from '../../../components/UI/ThemeProperties.jsx';
import { storeFactory } from '../../../testUtils';
import jest from 'jest-mock';

const setup = (initialState = {}) => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  let store = storeFactory(initialState);

  const Composition = withStyles(Wrapper, { withTheme: true })(Selector);
  const props = {
    options: [1, 2, 3],
    option: 1,
    title: 'TEST',
    disabled: false
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

    it('Should render Components of correct type', () => {
      wrapper = mount(<Composition {...props}/>);
      expect(wrapper.find('select')).not.toBe(undefined);
    });

    it('1,2,3 should be available in options', () => {
      wrapper = shallowWithDive(<Composition {...props}/>);
      expect(wrapper.find('option').at(0).props().value).toBe(1);
      expect(wrapper.find('option').at(1).props().value).toBe(2);
      expect(wrapper.find('option').at(2).props().value).toBe(3);
    });

    it('Should render with correct preselected value', () => {
      wrapper = mount(<Composition {...props}/>);
      expect(wrapper.find('select').prop('value')).toBe(1);
    });

    it('Should render with correct title', () => {
      wrapper = mount(<Composition {...props}/>);
      expect(wrapper.find('label').text()).toBe('TEST');
    });

    it('Should handle onChange event', () => {
      const mockFunc = jest.fn();
      wrapper = mount(<Composition {...props} handleSelect={mockFunc(3)}/>);

      //changing input value directly
      wrapper.find(Selector).at(0).props().value = 2;

      //checking if result got saved
      expect(wrapper.find(Selector).at(0).props().value).toBe(2);

      //simulating onChange value with correct input
      wrapper.find(Selector).simulate('change', 3);

      //checking results of mock function
      expect(mockFunc).toHaveBeenCalled();
      expect(mockFunc).toHaveBeenCalledTimes(1);
      expect(mockFunc).toHaveBeenCalledWith(3);
      expect(mockFunc.mock.calls[0][0]).toBe(3);

    });

  });

};

setup();
