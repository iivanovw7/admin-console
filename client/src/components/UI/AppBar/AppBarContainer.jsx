import Cookies from 'js-cookie';
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { NavigationStyles } from '../ThemeProperties';
import { signOutAction } from '../../../actions';
import { withRouter } from 'react-router-dom';

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
          <Button
            variant="outlined"
            color="secondary"
            type="submit"
            style={{ textTransform: 'none' }}
            onClick={() => {dispatch(signOutAction(history))}}
          >
            LOGOUT
          </Button>
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

export default connect(mapStateToProps, {
  signOutAction
})(withStyles(NavigationStyles, { withTheme: true })(withRouter(AppBarContainer)));


