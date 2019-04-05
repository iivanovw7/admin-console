import { CssBaseline, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppBarContainer from '../components/UI/AppBar/AppBarContainer';
import DrawerContainer from '../components/UI/Drawer/DrawerContainer';
import { Wrapper } from '../components/UI/ThemeProperties';

export default function (ComposedComponent) {

  const protectedContent = props => {

    const { classes, history } = props;
    const [mobileOpen, setDrawerState] = useState(false);

    const handleDrawerToggle = () => {
      setDrawerState(!mobileOpen);
    };

    useEffect(() => {
      if (!props.authenticated) {
        history.push('/');
      }
    }, []);

    return (

      <div className={classes.root}>
        <Helmet>
          <meta charSet="utf-8"/>
          <title>Admin console - Messages</title>
          <link rel="canonical" href=""/>
        </Helmet>
        <CssBaseline/>
        <AppBarContainer
          handleDrawerToggle={handleDrawerToggle}
          dispatch={props.dispatch}
        />
        <DrawerContainer
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
          history={history}
          dispatch={props.dispatch}
        />
        <ComposedComponent {...props} />
      </div>

    );

  };

  protectedContent.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  };

  function mapStateToProps(state) {
    return { authenticated: state.auth.user.authenticated };
  }

  return connect(mapStateToProps)(withStyles(Wrapper, { withTheme: true })(withRouter(protectedContent)));

}
