import Cookies from 'js-cookie';
import * as types from '../constants/actionTypes';
import * as URL from '../constants/api';
import axios from 'axios';

export const getUsers = (page, limit, history) => {

  return async dispatch => {

    await axios({
      method: 'get',
      url: `${URL.PRIVATE_API}/users`,
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
          type: types.FETCH_USERS,
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

export const searchUsers = (page, limit, query, history) => {

  return async dispatch => {

    await axios({
      method: 'get',
      url: `${URL.PRIVATE_API}/users/search`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        page: page,
        limit: limit,
        search: query
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({
          type: types.SEARCH_USERS,
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

export const getSingleUser = (id, history, redirect) => {

  return async dispatch => {
    await axios({
      method: 'get',
      url: `${URL.PRIVATE_API}/users/${id}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    })
      .then(response => {
        if(redirect) {
          history.push(`/users/${id}`);
        }
        dispatch({
          type: types.FETCH_USER,
          payload: response
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: types.FETCH_ERROR
        });
        history.push('/users');
      });
  };

};

export const updateUser = (formValues, id) => {

  return async dispatch => {
    await axios({
      method: 'put',
      url: `${URL.PRIVATE_API}/users/${id}`,
      data: {
        name: formValues.name,
        code: formValues.code,
        role: formValues.role,
        group: formValues.group,
        branch: formValues.branch,
        status: formValues.status,
        description: formValues.description,
        active: formValues.active,
        isPublic: formValues.isPublic,
        isEditable: formValues.isEditable
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({
          type: types.UPDATE_USER,
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

export const changeUserStatus = (id, status) => {

  return async dispatch => {
    await axios({
      method: 'put',
      url: `${URL.PRIVATE_API}/users/${id}`,
      data: {
        status: status
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({
          type: types.CHANGE_USER_STATUS,
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

