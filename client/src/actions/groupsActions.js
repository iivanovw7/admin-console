import * as axios from 'axios';
import Cookies from 'js-cookie';
import * as types from '../constants/actionTypes';
import * as URL from '../constants/api';

export const getGroups = (page, limit, history) => {

  return async dispatch => {
    await axios.get(`${URL.PRIVATE_API}/groups`, { params: { page, limit }, withCredentials: true })
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
    await axios.get(`${URL.PRIVATE_API}/groups/${id}`, { withCredentials: true })
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
    await axios.post(`${URL.PRIVATE_API}/groups`, formValues, { withCredentials: true })
               .then(response => {
                 dispatch({
                   type: types.ADD_GROUP,
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

export const deleteGroup = id => {

  return async dispatch => {
    await axios.delete(`${URL.PRIVATE_API}/groups/${id}`, { withCredentials: true })
               .then(response => {
                 dispatch({
                   type: types.DELETE_GROUP,
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


export const updateGroup = (formValues, id) => {

  return async dispatch => {
    await axios.put(`${URL.PRIVATE_API}/groups/${id}`, formValues, { withCredentials: true })
               .then(response => {
                 dispatch({
                   type: types.UPDATE_GROUP,
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

export const changeGroupStatus = (id, status) => {

  return async dispatch => {
    await axios.put(`${URL.PRIVATE_API}/groups/${id}`, status, { withCredentials: true })
               .then(response => {
                 dispatch({
                   type: types.CHANGE_GROUP_STATUS,
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

