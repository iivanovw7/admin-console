import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import AppBarContainer from '../components/UI/AppBar/AppBarContainer';
import DrawerContainer from '../components/UI/Drawer/DrawerContainer';
import { ContentStyles } from '../components/UI/ThemeProperties';
import Paper from '@material-ui/core/Paper';
import { fetchBranch } from '../actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const BranchesDetails = props => {

  const { classes, history } = props;
  const [mobileOpen, setDrawerState] = useState(false);
  const details = props.branches.list.output;

  useState(() => {
    //props.dispatch(fetchBranch(1, limit, history));
  });

  const handleDrawerToggle = () => {
    setDrawerState(!mobileOpen);
  };

  const handlePage = (newPage) => {
    //return props.dispatch(fetchBranches(newPage, limit, history));
  };

  return (
    <div className={classes.root}>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>Admin console - Create/Edit branch</title>
        <link rel="canonical" href=""/>
      </Helmet>
      <CssBaseline/>
      <AppBarContainer handleDrawerToggle={handleDrawerToggle} dispatch={props.dispatch}/>
      <DrawerContainer handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen}/>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Paper className={classes.controlsContainer}>
          <div className={classes.selectorsContainer}>
            <h2>Create/Edit branch</h2>
          </div>
        </Paper>
      </main>
    </div>
  );
};

BranchesDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { branches: state.branches };
}

export default connect(mapStateToProps, { fetchBranch })(withStyles(ContentStyles, { withTheme: true })(withRouter(BranchesDetails)));

