import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import jest from 'jest-mock';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, withRouter } from 'react-router-dom';
import * as mocks from '../__mocks__/';
import { Wrapper } from '../components/UI/ThemeProperties';
import Ticket from '../screens/Ticket';
import { mockStore } from '../testUtils';

const setup = (initialState = mockStore({})) => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  const mockDispatch = jest.fn();
  const Composition = withStyles(Wrapper, { withTheme: true })(withRouter(Ticket));
  const props = {
    dispatch: mockDispatch,
    tickets: {
      ticket: mocks.TICKET
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

  /**
   *  Renders ticket main screen form with styles,
   *  Checks if component rendered properly.
   */
  describe('Ticket screen', () => {
    it('Should match snapshot', () => {
      wrapper = shallow(
        <Provider store={initialState}>
          <MemoryRouter>
            <Composition {...props}/>
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.length).toEqual(1);
      expect(wrapper).toMatchSnapshot();
    });
  });
};

setup();
