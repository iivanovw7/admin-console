import { withStyles } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import jest from 'jest-mock';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import { addNewBranch, updateBranch } from '../../actions';
import BranchContainer from '../../components/Branch/BranchContainer';
import { validateBranch } from '../../utils/formsValidator';
import { Container } from '../../components/UI/ThemeProperties';
import { storeFactory, history } from '../../testUtils';
import * as mocks from '../../__mocks__/';

const setup = (initialState = {}) => {
  let wrapper;
  let shallowWithDive;
  let mount;
  let shallow;
  let store = storeFactory(initialState);

  //Splitting HOC components
  const Form = reduxForm({
    validate: validateBranch,
    asyncBlurFields: [], //to avoid error related to async validation
    form: 'branch',
    fields: [
      'name',
      'email',
      'phone',
      'fax',
      'address',
      'information',
      'status']
  })(BranchContainer);

  const Composition = connect(null, {
    addNewBranch,
    updateBranch
  })(withStyles(Container, { withTheme: true })(Form));

  const props = {
    branch: mocks.BRANCH,
    history: history
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
   *  Renders branch form with styles, imitates users actions:
   *  clicks buttons and input fields
   */
  describe('Branch Container', () => {
    it('Should render branch form with styles', () => {
      const mockFunc = jest.fn();
      wrapper = mount(
        <Provider store={store}>
          <Composition {...props} onSubmit={mockFunc()} />
        </Provider>
      );

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.find('button[type="button"]').text()).toBe('CANCEL');
      expect(wrapper.find('button[type="submit"]').text()).toBe('SAVE');

      //Comparing rendered fields to mock data
      expect(wrapper.find(BranchContainer).at(0).props(0).branch.address).toBe(mocks.BRANCH.address);
      expect(wrapper.find(BranchContainer).at(0).props(0).branch).toBe(mocks.BRANCH);

      //Checking email input field
      wrapper.find('input#email').simulate('click');
      wrapper.find('input#email').simulate('change', {target: { value: 'email@test.com'}});
      expect(wrapper.find('input#email').props().value).toBe('email@test.com');

      //Checking address input field
      wrapper.find('input#name').simulate('click');
      wrapper.find('input#name').simulate('change', {target: { value: 'Test name'}});
      expect(wrapper.find('input#name').props().value).toBe('Test name');

      //checking submit event handling
      wrapper.find(BranchContainer).simulate('submit');
      expect(mockFunc).toHaveBeenCalledTimes(1);

    });
  });
};

setup();
