import { Button, Drawer, Hidden } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions';
import { NavigationStyles } from '../ThemeProperties';
import DrawerNavigation from './DrawerNavigation';

const DrawerContainer = props => {

  const { classes, theme, handleDrawerToggle, mobileOpen, history, dispatch } = props;

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          container={classes.container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClick={handleDrawerToggle}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <DrawerNavigation/>
          <br/>
          <Button
            color="primary"
            className={classes.button}
            onClick={() => {
              dispatch(logoutUser(history));
            }}
          >
            Logout
          </Button>
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          <DrawerNavigation/>
          <br/>
          <Button
            color="primary"
            className={classes.button}
            onClick={() => {
              dispatch(logoutUser(history));
            }}
          >
            Logout
          </Button>
        </Drawer>
      </Hidden>
    </nav>
  );
};

DrawerContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func,
  mobileOpen: PropTypes.bool
};

export default connect(null, { logoutUser })(withStyles(NavigationStyles, { withTheme: true })(DrawerContainer));
