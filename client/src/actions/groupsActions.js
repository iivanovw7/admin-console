import Cookies from 'js-cookie';
import * as types from '../constants/actionTypes';
import * as URL from '../constants/api';
import axios from 'axios';

export const getGroups = (page, limit, history) => {

  return async dispatch => {
    await axios({
      method: 'get',
      url: `${URL.PRIVATE_API}/groups`,
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
          type: types.FETCH_GROUPS,
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

export const getSingleGroup = (id, history) => {

  return async dispatch => {
    await axios({
      method: 'get',
      url: `${URL.PRIVATE_API}/groups/${id}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    })
      .then(response => {
        history.push(`/groups/${id}`);
        dispatch({
          type: types.FETCH_GROUP,
          payload: response
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: types.FETCH_ERROR
        });
        history.push('/groups');
      });
  };

};

export const addNewGroup = formValues => {

  return async dispatch => {
    await axios({
      method: 'post',
      url: `${URL.PRIVATE_API}/groups`,
      data: {
        name: formValues.name,
        description: formValues.description,
        permissions: formValues.permissions,
        status: formValues.status
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({
          type: types.ADD_GROUP,
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

export const deleteGroup = id => {

  return async dispatch => {
    await axios({
      method: 'delete',
      url: `${URL.PRIVATE_API}/groups/${id}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({
          type: types.DELETE_GROUP,
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


export const updateGroup = (formValues, id) => {

  return async dispatch => {
    await axios({
      method: 'put',
      url: `${URL.PRIVATE_API}/groups/${id}`,
      data: {
        name: formValues.name,
        description: formValues.description,
        permissions: formValues.permissions,
        status: formValues.status
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({
          type: types.UPDATE_GROUP,
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

export const changeGroupStatus = (id, status) => {

  return async dispatch => {
    await axios({
      method: 'put',
      url: `${URL.PRIVATE_API}/groups/${id}`,
      data: {
        status: status
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({
          type: types.CHANGE_GROUP_STATUS,
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

