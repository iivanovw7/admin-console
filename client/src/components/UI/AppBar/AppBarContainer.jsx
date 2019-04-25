import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../../actions';
import { NavigationStyles } from '../ThemeProperties';
import { LogoutButton } from './LogoutButton';

const AppBarContainer = props => {
  const { classes, handleDrawerToggle, history, dispatch } = props;

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon/>
        </IconButton>
        <div/>
        <Typography className={classes.toolbarUserName} variant="h6" color="inherit" noWrap>
          {Cookies.get('username')}
          &nbsp;
          <LogoutButton
            handleLogout={logoutUser}
            {...props}
          />
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

AppBarContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func
};

function mapStateToProps(state) {
  return { user: state.auth.user.loggedUserObject };
}

export default connect(mapStateToProps, { logoutUser })(withStyles(NavigationStyles, { withTheme: true })(withRouter(AppBarContainer)));
