import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';
import Store from './store/index';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { themeProperties } from './components/UI/ThemeProperties';
import './styles/main.sass';

const store = Store();

const mountPoint = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <MuiThemeProvider theme={themeProperties}>
        {routes}
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
  , mountPoint);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

