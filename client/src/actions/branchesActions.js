import * as types from '../constants/actionTypes';
import Cookies from 'js-cookie';
import * as URL from '../constants/api';
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
        page: page,
        limit: limit
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

  return async dispatch => {
    await axios({
      method: 'post',
      url: `${URL.PRIVATE_API}/branches`,
      data: {
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
        fax: formValues.fax,
        address: formValues.address,
        information: formValues.information,
        status: formValues.status
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

  return async dispatch => {
    await axios({
      method: 'put',
      url: `${URL.PRIVATE_API}/branches/${id}`,
      data: {
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
        fax: formValues.fax,
        address: formValues.address,
        information: formValues.information,
        status: formValues.status
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
        dispatch({
          type: types.FETCH_ERROR
        });
        history.push('/branches');
      });
  };

};