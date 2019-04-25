import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { createMemoryHistory } from 'history';
import jest from 'jest-mock';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { MemoryRouter, withRouter } from 'react-router-dom';
import { getTickets } from '../../actions';
import { Wrapper } from '../../components/UI/ThemeProperties';
import Tickets from '../../screens/Tickets';
import { storeFactory } from '../../testUtils';
import * as mocks from './../../__mocks__/';

const history = createMemoryHistory('/dashboard');

const setup = (initialState = {}) => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  let store = storeFactory(initialState);

  const Composition = connect(null, { getTickets })(withStyles(Wrapper, { withTheme: true })(withRouter(Tickets)));
  const props = {
    history: history,
    tickets: mocks.TICKETS
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
   *  Renders tickets main screen form with styles,
   *  Checks if component rendered properly.
   */
  describe('Tickets screen', () => {
    it('Should render HOC with styles properly', () => {
      const mockFunc = jest.fn();
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Composition {...props} dispatch={mockFunc}/>
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.html()).not.toBe(null);
      expect(wrapper.html()).not.toBe(undefined);
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('h2').text()).toBe('Reports');
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
};

setup();



