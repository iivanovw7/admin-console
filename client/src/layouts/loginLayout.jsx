import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { LoginFormStyles } from '../components/UI/ThemeProperties';

export default function (ComposedComponent) {

  const loginLayout = props => {

    const { classes } = props;

    useEffect(() => {
      if (props.authenticated) {
        props.history.push('/statistics');
      }
    }, []);

    return (
      <div className={classes.loginWrapper}>
        <ComposedComponent {...props} />
      </div>
    );

  };

  loginLayout.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  };

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.user.authenticated
    };
  }

  return connect(mapStateToProps)(withStyles(LoginFormStyles, { withTheme: true })(withRouter(loginLayout)));

}