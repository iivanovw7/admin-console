import * as types from '../constants/ActionTypes';
import axios from 'axios';
import Cookies from 'js-cookie';

export const URL = 'http://localhost:7425/api';

export function signInAction({ email, password }, history) {

  const inOneWeek = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7));

  //action creator dispatches if correct response received from API
  //if correct response received => saving new token and userType in localStorage
  return async (dispatch) => {

    try {

      const res = await axios.post(`${URL}/auth/login`, { email, password });

      if (res.status(200)) {

        Cookies.set('auth__loggedUserObj', res.data, { expires: inOneWeek });

        dispatch({
          type: types.AUTHENTICATED
        });

      }

    } catch (error) {

      dispatch({
        type: types.AUTHENTICATION_ERROR
      });

    }
  };
}

//Sign out current user
export function signOutAction() {

  localStorage.clear(); //remove user data

  return {
    type: types.UNAUTHENTICATED
  };
}
