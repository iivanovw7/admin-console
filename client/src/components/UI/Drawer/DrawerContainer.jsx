import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Hidden, Button } from '@material-ui/core';
import DrawerNavigation from './DrawerNavigation';
import { withStyles } from '@material-ui/core/styles';
import { NavigationStyles } from '../ThemeProperties';
import { logoutUser } from '../../../actions';
import { connect } from 'react-redux';

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

export default connect(null, { logoutUser } )(withStyles(NavigationStyles, { withTheme: true })(DrawerContainer));