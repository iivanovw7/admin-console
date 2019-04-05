import { AppBar, IconButton, InputBase, Toolbar, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../../actions/auth';
import { NavigationStyles } from '../ThemeProperties';

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
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon/>
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </div>
        <Typography className={classes.toolbarUserName} variant="h6" color="inherit" noWrap>
          {Cookies.get('username')}
          &nbsp;
          <IconButton
            style={{ textTransform: 'none', color: 'white' }}
            aria-label="Delete"
            onClick={() => {
              dispatch(logoutUser(history));
            }}
          >
            <Icon>exit_to_app</Icon>
          </IconButton>
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
