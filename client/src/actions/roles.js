import Cookies from 'js-cookie';
import * as types from '../constants/ActionTypes';
import * as URL from '../constants/APIurl';
import axios from 'axios';

export const getRoles = (page, limit, history) => {

  return async dispatch => {
    await axios({
      method: 'get',
      url: `${URL.PRIVATE_API}/roles`,
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
          type: types.FETCH_ROLES,
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

export const getSingleRole = (id, history) => {

  return async dispatch => {
    await axios({
      method: 'get',
      url: `${URL.PRIVATE_API}/roles/${id}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    })
      .then(response => {
        history.push(`/roles/${id}`);
        dispatch({
          type: types.FETCH_ROLE,
          payload: response
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: types.FETCH_ERROR
        });
        history.push('/roles');
      });
  };

};

export const addNewRole = formValues => {

  const { name, code, description, active, isPublic, isEditable } = formValues;

  return async dispatch => {
    await axios({
      method: 'post',
      url: `${URL.PRIVATE_API}/roles`,
      data: {
        name, code, description, active, isPublic, isEditable
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({
          type: types.ADD_ROLE,
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

export const deleteRole = id => {

  return async dispatch => {
    await axios({
      method: 'delete',
      url: `${URL.PRIVATE_API}/roles/${id}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({
          type: types.DELETE_ROLE,
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


export const updateRole = (formValues, id) => {

  const { name, code, description, active, isPublic, isEditable } = formValues;

  return async dispatch => {
    await axios({
      method: 'put',
      url: `${URL.PRIVATE_API}/roles/${id}`,
      data: {
        name, code, description, active, isPublic, isEditable
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({
          type: types.UPDATE_ROLE,
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

export const changeRoleStatus = (id, status) => {

  return async dispatch => {
    await axios({
      method: 'put',
      url: `${URL.PRIVATE_API}/roles/${id}`,
      data: {
        active: status
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({
          type: types.CHANGE_ROLE_STATUS,
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