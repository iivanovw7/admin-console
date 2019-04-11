import Cookies from 'js-cookie';
import * as types from '../constants/ActionTypes';
import * as URL from '../constants/APIurl';
import axios from 'axios';

export const getTickets = (page, limit, history) => {

  return async dispatch => {

    await axios({
      method: 'get',
      url: `${URL.PRIVATE_API}/tickets`,
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

    await axios({
      method: 'get',
      url: `${URL.PRIVATE_API}/tickets/search`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        page: page || 1,
        limit: limit || 10,
        search: query
      },
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
    await axios({
      method: 'get',
      url: `${URL.PRIVATE_API}/tickets/${id}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    })
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

  const { note, status } = formValues;

  return async dispatch => {
    await axios({
      method: 'put',
      url: `${URL.PRIVATE_API}/tickets/${id}`,
      data: {
        note, status
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({
          type: types.UPDATE_TICKET,
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