import * as axios from 'axios';
import Cookies from 'js-cookie';
import * as types from '../constants/actionTypes';
import * as URL from '../constants/api';

export const loginUser = ({ email, password }, history) => {

  //TODO
  // consider new way of authenticating user for shorter period of time, may be use reducer
  // instead of cookies to store data and add special route to check authenticated users after
  // page got rendered
  const inOneWeek = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7));

  return async dispatch => {
    await axios.post(`${URL.PRIVATE_API}/auth/login`, {
      email,
      password
    }, { withCredentials: true })
               .then(response => {
                 Cookies.set('LoggedUserObject', response.data, { expires: inOneWeek });
                 Cookies.set('username', response.data.name, { expires: inOneWeek });
                 Cookies.set('id', response.data._id, { expires: inOneWeek });
                 dispatch({
                   type: types.AUTHENTICATED,
                   payload: response
                 });
                 history.push('/statistics');

               })
               .catch(error => {
                 dispatch({
                   type: types.AUTHENTICATION_ERROR
                 });
               });
  };
};

export const logoutUser = history => {

  return async dispatch => {
    await axios.get(`${URL.PRIVATE_API}/auth/logout`, { withCredentials: true })
               .then(response => {
                 Cookies.remove('LoggedUserObject');
                 Cookies.remove('username');
                 Cookies.remove('id');
                 dispatch({
                   type: types.UNAUTHENTICATED
                 });
                 history.push('/');
               })
               .catch(error => {
                 Cookies.remove('LoggedUserObject');
                 dispatch({
                   type: types.UNAUTHENTICATED
                 });
                 history.push('/');
               });
  };
};
