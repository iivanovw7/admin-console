import * as axios from 'axios';
import Cookies from 'js-cookie';
import * as types from '../constants/actionTypes';
import * as URL from '../constants/api';

export const getRoles = (page, limit, history) => {

  return async dispatch => {
    await axios.get(`${URL.PRIVATE_API}/roles`, { params: { page, limit }, withCredentials: true })
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
    await axios.get(`${URL.PRIVATE_API}/roles/${id}`, { withCredentials: true })
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

  return async dispatch => {
    await axios.post(`${URL.PRIVATE_API}/roles`, formValues, { withCredentials: true })
               .then(response => {
                 dispatch({
                   type: types.ADD_ROLE,
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

export const deleteRole = id => {

  return async dispatch => {
    await axios.delete(`${URL.PRIVATE_API}/roles/${id}`, { withCredentials: true })
               .then(response => {
                 dispatch({
                   type: types.DELETE_ROLE,
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


export const updateRole = (formValues, id) => {

  return async dispatch => {
    await axios.put(`${URL.PRIVATE_API}/roles/${id}`, formValues, { withCredentials: true })
               .then(response => {
                 dispatch({
                   type: types.UPDATE_ROLE,
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

export const changeRoleStatus = (id, status) => {

  return async dispatch => {
    await axios.put(`${URL.PRIVATE_API}/roles/${id}`, { active: status }, { withCredentials: true })
               .then(response => {
                 dispatch({
                   type: types.CHANGE_ROLE_STATUS,
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