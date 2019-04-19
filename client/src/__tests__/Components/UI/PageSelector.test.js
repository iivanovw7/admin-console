import { withStyles } from '@material-ui/core/styles';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import jest from 'jest-mock';
import React from 'react';
import { PageSelector } from '../../../components/UI/PageSelector';
import { Wrapper } from '../../../components/UI/ThemeProperties';
import { storeFactory } from '../../../testUtils';

const setup = (initialState = {}) => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  let store = storeFactory(initialState);

  const Composition = withStyles(Wrapper, { withTheme: true })(PageSelector);
  const props = {
    data: {
      list: {
        pages: [23444],
        page: [2],
        results: 2432
      }
    }
  };

  beforeEach(() => {
    shallow = createShallow();
    shallowWithDive = createShallow({ dive: true });
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  describe('Should render Pages Selector with styles, values, props and options', () => {

    it('Should render nex and prev svg buttons', () => {
      const mockFunc = jest.fn();
      wrapper = mount(<Composition {...props} handlePage={mockFunc()}/>);
      expect(wrapper.find('NavigateBeforeIcon').html()).not.toBe(undefined);
      expect(wrapper.find('NavigateNextIcon').html()).not.toBe(undefined);
    });

    it('Should render Element with correct results string', () => {
      const mockFunc = jest.fn();
      wrapper = mount(<Composition {...props} handlePage={mockFunc()}/>);
      expect(wrapper.find(PageSelector).text()).toBe('Results: 24322 of 23444');
    });

    it('Should handle onChange event', () => {
      const mockFunc = jest.fn();
      wrapper = mount(<Composition {...props} handlePage={mockFunc}/>);

      wrapper.find('NavigateNextIcon').simulate('click');
      wrapper.find('NavigateNextIcon').simulate('click');

      wrapper.find('NavigateBeforeIcon').simulate('click');
      wrapper.find('NavigateBeforeIcon').simulate('click');

      expect(mockFunc).toHaveBeenCalled();
      expect(mockFunc).toHaveBeenCalledTimes(4);

    });


  });

};

setup();
