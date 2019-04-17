import Cookies from 'js-cookie';
import * as types from '../constants/actionTypes';
import * as URL from '../constants/api';
import axios from 'axios';

export const getMessages = (page, limit, history) => {

  return async dispatch => {

    await axios({
      method: 'get',
      url: `${URL.PRIVATE_API}/messages`,
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
          type: types.FETCH_MESSAGES,
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

export const searchMessages = (page, limit, query, history) => {

  return async dispatch => {

    await axios({
      method: 'get',
      url: `${URL.PRIVATE_API}/messages/search`,
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
          type: types.SEARCH_MESSAGES,
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

export const getSingleMessage = (id, history) => {

  return async dispatch => {
    await axios({
      method: 'get',
      url: `${URL.PRIVATE_API}/messages/${id}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    })
      .then(response => {
        history.push(`/messages/${id}`);
        dispatch({
          type: types.FETCH_MESSAGE,
          payload: response
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: types.FETCH_ERROR
        });
        history.push('/messages');
      });
  };
};


export const sendMessage = (formValues, destination) => {

  return async dispatch => {
    await axios({
      method: 'post',
      url: `${URL.PRIVATE_API}/messages/new`,
      data: {
        subject: formValues.subject,
        message: formValues.message,
        senderId: formValues.sender,
        [`${destination}Id`]: formValues[destination],
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({
          type: types.ADD_MESSAGE,
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

//TODO implement DELETE functionality in Private API during refactoring
export const deleteMessage = () => {
  return ({
    type: types.UNDONE_MESSAGE
  });
};

