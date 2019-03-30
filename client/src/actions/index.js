import * as types from '../constants/ActionTypes';
import axios from 'axios';
import Cookies from 'js-cookie';
import * as URL from '../constants/APIurl';


export function signInAction({ email, password }, history) {


  const inOneWeek = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7));

  //action creator dispatches if correct response received from API
  return async (dispatch) => {
    await axios.post(`${URL.PRIVATE_API}/auth/login`, { email, password })
               .then(response => {

                 Cookies.set('LoggedUserObject', response.data, { expires: inOneWeek });
                 Cookies.set('username', response.data.name, { expires: inOneWeek });

                 dispatch({
                   type: types.AUTHENTICATED
                 }).then(history.push('/statistics'));

               })
               .catch(error => {

                 dispatch({
                   type: types.AUTHENTICATION_ERROR
                 });

               });

  };
}

//Sign out current user
export function signOutAction(history) {

  axios.get(`${URL.PRIVATE_API}/auth/logout`)
       .then(response => {
         Cookies.remove('LoggedUserObject');
         history.push('/');
         return { type: types.UNAUTHENTICATED };
       })
       .catch(error => {
         Cookies.remove('LoggedUserObject');
         history.push('/');
         return { type: types.UNAUTHENTICATED };
       });

}
