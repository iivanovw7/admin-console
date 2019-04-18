import * as axios from 'axios';
import Cookies from 'js-cookie';
import * as types from '../constants/actionTypes';
import * as URL from '../constants/api';

export const getTickets = (page, limit, history) => {

  return async dispatch => {
    await axios.get(`${URL.PRIVATE_API}/tickets`, {
      params: { page, limit },
      withCredentials: true
    })
               .then(response => {
                 dispatch({
                   type: types.FETCH_TICKETS,
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

export const searchTickets = (page, limit, query, history) => {

  return async dispatch => {
    await axios.get(`${URL.PRIVATE_API}/tickets/search`, {
      params: { page, limit, search: query },
      withCredentials: true
    })
               .then(response => {
                 dispatch({
                   type: types.SEARCH_TICKETS,
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

export const getSingleTicket = (id, history) => {

  return async dispatch => {
    await axios.get(`${URL.PRIVATE_API}/tickets/${id}`, { withCredentials: true })
               .then(response => {
                 history.push(`/tickets/${id}`);
                 dispatch({
                   type: types.FETCH_TICKET,
                   payload: response
                 });
               })
               .catch(error => {
                 console.log(error);
                 dispatch({
                   type: types.FETCH_ERROR
                 });
                 history.push('/tickets');
               });
  };
};

export const updateTicket = (formValues, id) => {

  return async dispatch => {
    await axios.put(`${URL.PRIVATE_API}/tickets/${id}`, formValues, { withCredentials: true })
               .then(response => {
                 dispatch({
                   type: types.UPDATE_TICKET,
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