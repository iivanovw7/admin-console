import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { CssBaseline, Paper, withStyles } from '@material-ui/core';
import { LoginFormStyles, Wrapper } from '../components/UI/ThemeProperties';
import { withRouter } from 'react-router-dom';

export default function (ComposedComponent) {

  const loginLayout = props => {

    const { classes, history } = props;

    useEffect(() => {
      if (props.authenticated) {
        props.history.push('/statistics');
      }
    }, []);

    return (

      <div className={classes.loginWrapper}>
        <Helmet>
          <meta charSet="utf-8"/>
          <title>Admin console</title>
          <link rel="canonical" href=""/>
        </Helmet>
        <ComposedComponent {...props} />
      </div>

    );

  };

  loginLayout.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  };

  function mapStateToProps(state) {
    return { authenticated: state.auth.user.authenticated };
  }

  return connect(mapStateToProps)(withStyles(LoginFormStyles, { withTheme: true })(withRouter(loginLayout)));

}