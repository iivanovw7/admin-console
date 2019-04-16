import Cookies from 'js-cookie';
import * as types from '../constants/actionTypes';
import * as URL from '../constants/api';
import axios from 'axios';

export const getStatistics = (dataType, history, months) => {

  return async dispatch => {

    await axios({
      method: 'get',
      url: `${URL.PRIVATE_API}/stats/${dataType.toLocaleLowerCase()}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        months: months
      },
      withCredentials: true
    })
      .then(response => {
        dispatch({
          type: types[`FETCH_${dataType.toUpperCase()}_STATS`],
          payload: response,
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

export const changeChartStyle = (dataType, chartStyle) => {
  console.log(chartStyle)
  return {
    type: types[`SET_${dataType.toUpperCase()}_CHARTS_STYLE`],
    payload: chartStyle,
  };
};

