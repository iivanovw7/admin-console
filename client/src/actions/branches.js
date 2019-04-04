import * as types from '../constants/ActionTypes';
import Cookies from 'js-cookie';
import * as URL from '../constants/APIurl';
import axios from 'axios';

export const getBranches = (page, limit, history) => {

  return async dispatch => {
    await axios({
      method: 'get',
      url: `${URL.PRIVATE_API}/branches`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        page: page || 1,
        limit: limit || 10
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({
          type: types.FETCH_BRANCHES,
          payload: response
        });
      })
      .catch(error => {
        console.log(error);
        Cookies.remove('LoggedUserObject');
        dispatch({
          type: types.UNAUTHENTICATED
        });
        history.push('/');
      });
  };

};

export const addNewBranch = formValues => {

  const { name, email, phone, fax, address, information, status } = formValues;

  return async dispatch => {
    await axios({
      method: 'post',
      url: `${URL.PRIVATE_API}/branches`,
      data: {
        name, email, phone, fax, address, information, status
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({
          type: types.ADD_BRANCH,
          payload: response
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: types.ERROR
        });
      });

  };


};

export const updateBranch = (formValues, id) => {

  const { name, email, phone, fax, address, information, status } = formValues;

  return async dispatch => {
    await axios({
      method: 'put',
      url: `${URL.PRIVATE_API}/branches/${id}`,
      data: {
        name, email, phone, fax, address, information, status
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({
          type: types.UPDATE_BRANCH,
          payload: response
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: types.ERROR
        });
      });

  };
};

export const getSingleBranch = (id, history) => {

  return async dispatch => {
    await axios({
      method: 'get',
      url: `${URL.PRIVATE_API}/branches/${id}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    })
      .then(response => {
        history.push(`/branches/${id}`);
        dispatch({
          type: types.FETCH_BRANCH,
          payload: response
        });
      })
      .catch(error => {
        console.log(error);
        Cookies.remove('LoggedUserObject');
        dispatch({
          type: types.UNAUTHENTICATED
        });
        history.push('/');
      });
  };

};