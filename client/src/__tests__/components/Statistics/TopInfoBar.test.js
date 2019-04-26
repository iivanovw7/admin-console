import { withStyles, List } from '@material-ui/core';
import { createMount } from '@material-ui/core/test-utils';
import React from 'react';
import { TopInfoBar } from '../../../components/Statistics/TopInfoBar';
import { TopInfoBarElement } from '../../../components/Statistics/TopInfoBarElement';
import { Buttons } from '../../../components/UI/ThemeProperties';

const setup = () => {
  let wrapper;
  let mount;
  const props = {
    viewBranch: 'TEST',
    viewMode: 'ADMIN',
    viewGroup: 'GROUP'
  };

  const Composition = withStyles(Buttons, { withTheme: true })(TopInfoBar);

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  describe('Should render charts top bar component ', () => {

    it('Should render component correctly field ', () => {
      wrapper = mount(<Composition {...props} />);
      expect(wrapper.find(TopInfoBar)).not.toBe(undefined);
      expect(wrapper.find(TopInfoBar).html()).not.toBe(null);
      expect(wrapper.find(TopInfoBar).length).toEqual(1);
    });

    it('Should render list of components ', () => {
      wrapper = mount(<Composition {...props} />);
      expect(wrapper.find(List)).not.toBe(undefined);
      expect(wrapper.find(List).html()).not.toBe(null);
      expect(wrapper.find(List).length).toEqual(1);
    });

    it('Should render component with correct data ', () => {
      wrapper = mount(<Composition {...props} />);
      expect(wrapper.find(TopInfoBarElement).length).toBe(3);
    });

    it('Should match snapshot', () => {
      wrapper = mount(<Composition {...props} />);
      expect(wrapper.html()).toMatchSnapshot();
    });

  });
};

setup();
