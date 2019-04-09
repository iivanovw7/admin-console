import Cookies from 'js-cookie';
import * as types from '../constants/ActionTypes';
import * as URL from '../constants/APIurl';
import axios from 'axios';

export const getUsers = (page, limit, history) => {

  return async dispatch => {

    console.log(page, limit)

    await axios({
      method: 'get',
      url: `${URL.PRIVATE_API}/users`,
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

export const getSingleUser = (id, history) => {

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
        history.push(`/users/${id}`);
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

  const { name, code, description, active, isPublic, isEditable } = formValues;

  return async dispatch => {
    await axios({
      method: 'put',
      url: `${URL.PRIVATE_API}/users/${id}`,
      data: {
        name, code, description, active, isPublic, isEditable
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