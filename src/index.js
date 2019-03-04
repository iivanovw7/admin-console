import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.sass';
import {BrowserRouter} from 'react-router-dom';
import Store from './store/index';
import 'babel-polyfill';
import {Provider} from 'react-redux';
import routes from './Routes';
import registerServiceWorker from './registerServiceWorker';

const store = Store();

const mountPoint = document.querySelector('.container');


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>
  , mountPoint);

registerServiceWorker();




