import { withStyles } from '@material-ui/core';
import { createMount } from '@material-ui/core/test-utils';
import React from 'react';
import { TopInfoBarElement } from '../../components/Statistics/TopInfoBarElement';
import { NavigationStyles } from '../../components/UI/ThemeProperties';

let wrapper;
let mount;
const Composition = withStyles(NavigationStyles, { withTheme: true })(TopInfoBarElement);
const props = {
  icon: 'test',
  view: 'ADMIN',
  title: 'TITLE'
};

beforeEach(() => {
  mount = createMount();
});

afterEach(() => {
  mount.cleanUp();
});

describe('Should render charts top bar element ', () => {

  it('Should render component correctly field ', () => {
    wrapper = mount(<Composition {...props} />);
    expect(wrapper.find('li').length).toEqual(1);
  });

  it('Should render component with correct data ', () => {
    wrapper = mount(<Composition {...props} />);
    expect(wrapper.find('span').first().text()).toBe('test');
    expect(wrapper.find('span').last().text()).toBe('TITLE');
    expect(wrapper.find('p').text()).toBe('ADMIN');
  });

  it('Should match snapshot', () => {
    wrapper = mount(<Composition {...props} />);
    expect(wrapper.html()).toMatchSnapshot();
  });

});
