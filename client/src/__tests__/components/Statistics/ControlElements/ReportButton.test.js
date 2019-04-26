import { withStyles, IconButton } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { createMemoryHistory } from 'history';
import jest from 'jest-mock';
import React from 'react';
import csvIcon from '../../../../icons/csv-file-format-symbol.svg';
import { TopInfoBarButton } from '../../../../components/Statistics/Chart/ControlElements/ReportButton';
import { Container } from '../../../../components/UI/ThemeProperties';

const setup = () => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  const mockOnClick = jest.fn();
  const history = createMemoryHistory('/dashboard');
  const Composition = withStyles(Container, { withTheme: true })(TopInfoBarButton);

  const props = {
    history: history,
    image: csvIcon,
    alt: 'test-alt',
    handleClick: mockOnClick,
    title: 'TEST'
  };

  beforeEach(() => {
    shallow = createShallow();
    shallowWithDive = createShallow({ dive: true });
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  describe('Should render Button with styles and options', () => {

    it('Should render component', () => {
      wrapper = mount(<Composition {...props} />);
      expect(wrapper.find('li')).not.toBe(undefined);
      expect(wrapper.find('li').html()).not.toBe(null);
      expect(wrapper.find('li').length).toEqual(1);
      expect(wrapper.find('button').length).toEqual(2);
    });

    it('Should render desktop button', () => {
      wrapper = mount(<Composition {...props} />);
      expect(wrapper.find(IconButton)).not.toBe(undefined);
      expect(wrapper.find(IconButton)).not.toBe(null);
    });

    it('Should render mobile button', () => {
      wrapper = mount(<Composition {...props} />);
      expect(wrapper.find('button').last()).not.toBe(undefined);
      expect(wrapper.find('button').last().html()).not.toBe(null);
      expect(wrapper.find('button').last().text()).toBe('TEST');

    });

    it('Click handling', () => {
      wrapper = mount(<Composition {...props} />);
      wrapper.find(IconButton).simulate('click');
      expect(mockOnClick).toHaveBeenCalled();
    });

    it('Should match snapshot', () => {
      wrapper = mount(<Composition {...props} />);
      expect(wrapper.html()).toMatchSnapshot();
    });


  });

};

setup();



