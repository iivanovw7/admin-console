import * as axios from 'axios';
import Cookies from 'js-cookie';
import * as types from '../constants/actionTypes';
import * as URL from '../constants/api';

export const getStatistics = (dataType, history, months) => {

  return async dispatch => {
    await axios.get(`${URL.PRIVATE_API}/stats/${dataType.toLocaleLowerCase()}`, {
      params: { months: months },
      withCredentials: true
    })
               .then(response => {
                 dispatch({
                   type: types[`FETCH_${dataType.toUpperCase()}_STATS`],
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

export const changeChartStyle = (dataType, chartStyle) => {
  const categoryName = dataType.toLocaleString();
  return {
    type: types.SET_CHART_STYLE,
    payload: chartStyle,
    categoryName
  };
};

