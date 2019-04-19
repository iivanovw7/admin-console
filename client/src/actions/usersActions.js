import * as axios from 'axios';
import Cookies from 'js-cookie';
import * as types from '../constants/actionTypes';
import * as URL from '../constants/api';

export const getUsers = (page, limit, history) => {

  return async dispatch => {
    await axios.get(`${URL.PRIVATE_API}/users`, {
      params: { page, limit },
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
    await axios.get(`${URL.PRIVATE_API}/users/search`, {
      params: { page, limit, search: query },
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
    await axios.get(`${URL.PRIVATE_API}/users/${id}`, { withCredentials: true })
               .then(response => {
                 if (redirect) {
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
    await axios.put(`${URL.PRIVATE_API}/users/${id}`, formValues, { withCredentials: true })
               .then(response => {
                 dispatch({
                   type: types.UPDATE_USER,
                   payload: response
                 });
               })
               .catch(error => {
                 console.log(error);
                 dispatch({
                   type: types.GENERAL_ERROR
                 });
               });
  };
};

export const changeUserStatus = (id, status) => {

  return async dispatch => {
    await axios.put(`${URL.PRIVATE_API}/users/${id}`, { status }, { withCredentials: true })
               .then(response => {
                 dispatch({
                   type: types.CHANGE_USER_STATUS,
                   payload: response
                 });
               })
               .catch(error => {
                 console.log(error);
                 dispatch({
                   type: types.GENERAL_ERROR
                 });
               });

  };
};

