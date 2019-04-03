import * as types from '../constants/ActionTypes';
import Cookies from 'js-cookie';
import * as URL from '../constants/APIurl';
import axios from 'axios';

export const signInAction = ({ email, password }, history) => {

  const inOneWeek = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7));

  return async dispatch => {

    await axios.post(`${URL.PRIVATE_API}/auth/login`, {
      email,
      password
    }, { withCredentials: true })
               .then(response => {

                 Cookies.set('LoggedUserObject', response.data, { expires: inOneWeek });
                 Cookies.set('username', response.data.name, { expires: inOneWeek });

                 dispatch({
                   type: types.AUTHENTICATED
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

export const signOutAction = history => {

  return async dispatch => {

    await axios.get(`${URL.PRIVATE_API}/auth/logout`, { withCredentials: true })
               .then(response => {
                 Cookies.remove('LoggedUserObject');
                 dispatch({
                   type: types.UNAUTHENTICATED
                 });
                 history.push('/');
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


