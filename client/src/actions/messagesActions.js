import * as axios from 'axios';
import Cookies from 'js-cookie';
import * as types from '../constants/actionTypes';
import * as URL from '../constants/api';

export const getMessages = (page, limit, history) => {

  return async dispatch => {

    await axios.get(`${URL.PRIVATE_API}/messages`, {
      params: { page, limit },
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

    await axios.get(`${URL.PRIVATE_API}/messages/search`, {
      params: { page, limit, search: query },
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
    await axios.get(`${URL.PRIVATE_API}/messages/${id}`, { withCredentials: true })
               .then(response => {
                 dispatch({
                   type: types.FETCH_MESSAGE,
                   payload: response
                 });
                 history.push(`/messages/${id}`);
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
    await axios.post(`${URL.PRIVATE_API}/messages/new`,
      {
        subject: formValues.subject,
        message: formValues.message,
        senderId: formValues.sender,
        [`${destination}Id`]: formValues[destination]
      },
      {
        withCredentials: true
      }
    )
               .then(response => {
                 dispatch({
                   type: types.ADD_MESSAGE,
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

//TODO implement DELETE functionality in Private API during refactoring
export const deleteMessage = () => {
  return ({
    type: types.UNDONE_MESSAGE
  });
};

