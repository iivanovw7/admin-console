import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { createMemoryHistory } from 'history';
import jest from 'jest-mock';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { MemoryRouter, withRouter } from 'react-router-dom';
import { getSingleMessage } from '../../actions';
import { Wrapper } from '../../components/UI/ThemeProperties';
import Message from '../../screens/Message';
import { storeFactory } from '../../testUtils';
import * as mocks from './../../__mocks__/';

const history = createMemoryHistory('/dashboard');

const setup = (initialState = {}) => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  let store = storeFactory(initialState);

  const Composition = connect(null, { getSingleMessage })(withStyles(Wrapper, { withTheme: true })(withRouter(Message)));
  const props = {
    history: history,
    messages: {
      message: mocks.MESSAGE
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
   *  Renders message main screen form with styles,
   *  Checks if component rendered properly.
   */
  describe('Message screen', () => {
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
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
};

setup();



