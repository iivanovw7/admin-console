import * as axios from 'axios';
import Cookies from 'js-cookie';
import * as types from '../constants/actionTypes';
import * as URL from '../constants/api';

export const getBranches = (page, limit, history) => {

  return async dispatch => {
    await axios.get(`${URL.PRIVATE_API}/branches`, {
      params: { page, limit },
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
    await axios.post(`${URL.PRIVATE_API}/branches`, formValues, { withCredentials: true })
               .then(response => {
                 dispatch({
                   type: types.ADD_BRANCH,
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

export const updateBranch = (formValues, id) => {

  return async dispatch => {
    await axios.put(`${URL.PRIVATE_API}/branches/${id}`, formValues, { withCredentials: true })
               .then(response => {
                 dispatch({
                   type: types.UPDATE_BRANCH,
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

export const getSingleBranch = (id, history) => {

  return async dispatch => {
    await axios.get(`${URL.PRIVATE_API}/branches/${id}`, { withCredentials: true })
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