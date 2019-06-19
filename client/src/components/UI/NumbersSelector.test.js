import { withStyles } from '@material-ui/core/styles';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import jest from 'jest-mock';
import React from 'react';
import { NumbersSelector } from './NumbersSelector';
import { Wrapper } from './ThemeProperties';

let wrapper;
let shallowWithDive;
let mount;
let shallow;
const Composition = withStyles(Wrapper, { withTheme: true })(NumbersSelector);
const props = {
  options: [1, 2, 3],
  option: 1,
  title: 'TEST',
  disabled: false,
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

  it('Should render components of correct type', () => {
    wrapper = mount(<Composition {...props} handleSelect={jest.fn()}/>);
    expect(wrapper.find('select')).not.toBe(undefined);
  });

  it('1,2,3 should be available in options', () => {
    wrapper = shallowWithDive(<Composition {...props} handleSelect={jest.fn()}/>);
    expect(wrapper.find('option').at(0).props().value).toBe(1);
    expect(wrapper.find('option').at(1).props().value).toBe(2);
    expect(wrapper.find('option').at(2).props().value).toBe(3);
  });

  it('Should render with correct preselected value', () => {
    wrapper = mount(<Composition {...props} handleSelect={jest.fn()}/>);
    expect(wrapper.find('select').prop('value')).toBe(1);
  });

  it('Should render with correct title', () => {
    wrapper = mount(<Composition {...props} handleSelect={jest.fn()}/>);
    expect(wrapper.find('label').text()).toBe('TEST');
  });

  it('Should render with correct props', () => {
    wrapper = mount(<Composition {...props} handleSelect={jest.fn()}/>);

    //changing input value directly
    wrapper.find(NumbersSelector).at(0).props().value = 2;

    //checking if result changed
    expect(wrapper.find(NumbersSelector).at(0).props().value).toBe(2);
  });

  it('Should handle onChange event', () => {
    const mockFunc = jest.fn();

    //Disabling PropTypes console.log warning until component is rendered
    const originalError = console.error;
    console.error = jest.fn();
    wrapper = shallow(<Composition {...props} handleSelect={mockFunc()} />);
    console.error = originalError;

    //simulating onChange value with correct input
    wrapper.find(NumbersSelector).simulate('change', 3);

    //checking results of mock function
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

});
