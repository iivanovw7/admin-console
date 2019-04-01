import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import DrawerNavigation from './DrawerNavigation';
import { withStyles } from '@material-ui/core/styles';
import { NavigationStyles } from '../ThemeProperties';

const DrawerContainer = props => {

  const { classes, theme, handleDrawerToggle, mobileOpen } = props;

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          container={classes.container}
          variant="temporary"
          anchor={(theme.direction === 'rtl') ? ('right') : ('left')}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <DrawerNavigation/>
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
         <DrawerNavigation/>
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

export default withStyles(NavigationStyles, { withTheme: true })(DrawerContainer);



