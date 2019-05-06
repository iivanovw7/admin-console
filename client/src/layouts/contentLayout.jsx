import { CssBaseline, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppBarContainer from '../components/UI/AppBar/AppBarContainer';
import DrawerContainer from '../components/UI/Drawer/DrawerContainer';
import { Wrapper } from '../components/UI/ThemeProperties';

const ContentLayout = props => {

  const { classes, history } = props;
  const [mobileOpen, setDrawerState] = useState(false);
  const handleDrawerToggle = () => {
    setDrawerState(!mobileOpen);
  };

  return (
    <div className={classes.root}>
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
      {props.children}
    </div>
  );
};

ContentLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default connect(null)(withStyles(Wrapper, { withTheme: true })(withRouter(ContentLayout)));
