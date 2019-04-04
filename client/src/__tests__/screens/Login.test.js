import React from 'react';
import { fromJS } from 'immutable';
import Enzyme, { shallow } from 'enzyme';
import Login from '../../screens/Login';

const fixture = {
  example: {
    result: fromJS({
      testing: 'data'
    })
  }
};

describe('ExampleView', () => {
  it('Should render a blank div without data', () => {
    const el = shallow(<Login/>);

    expect(el.length).toEqual(1);
    //TODO fill with desired output
    expect(el.find('.exampleOutput').length).toEqual(0);
  });

  it('Should render with correct data', () => {
    const el = shallow(
      <Login {...fixture} />
    );

    expect(el.length).toEqual(1);
    //TODO fill with desired output
    expect(el.find('.exampleOutput').length).toEqual(0);
  });
});

