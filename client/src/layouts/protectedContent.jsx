import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { CssBaseline, Paper, withStyles } from '@material-ui/core';
import AppBarContainer from '../components/UI/AppBar/AppBarContainer';
import DrawerContainer from '../components/UI/Drawer/DrawerContainer';
import { Wrapper } from '../components/UI/ThemeProperties';
import { withRouter } from 'react-router-dom';

export default function (ComposedComponent) {

  const protectedContent = props => {
    const { classes history } = props;
    const [mobileOpen setDrawerState] = useState(false);

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
        <AppBarContainer handleDrawerToggle={handleDrawerToggle} dispatch={props.dispatch}/>
        <DrawerContainer handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen}/>
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


