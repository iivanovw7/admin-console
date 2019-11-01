import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import jest from 'jest-mock';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, withRouter } from 'react-router-dom';
import { Wrapper } from '../components/UI/ThemeProperties';
import Message from '../screens/Message';
import { mockStore } from '../testUtils';

const setup = (initialState = mockStore({})) => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  const mockFunc = jest.fn();
  const Composition = withStyles(Wrapper, { withTheme: true })(withRouter(Message));
  const props = {
    dispatch: mockFunc
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
    it('Should match snapshot', () => {
      wrapper = shallow(
        <Provider store={initialState}>
          <MemoryRouter>
            <Composition {...props} />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.length).toEqual(1);
      expect(wrapper).toMatchSnapshot();
    });
  });
};

setup();



