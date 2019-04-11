import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { themeProperties } from './components/UI/ThemeProperties';
import routes from './routes';
import * as serviceWorker from './serviceWorker';
import Store from './store/index';
import './styles/main.sass';

const store = Store();

const mountPoint = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <Helmet>
          <meta charSet="utf-8"/>
          <title>Admin console</title>
          <link rel="canonical" href=""/>
        </Helmet>
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