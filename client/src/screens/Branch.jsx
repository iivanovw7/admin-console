import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import AppBarContainer from '../components/UI/AppBar/AppBarContainer';
import DrawerContainer from '../components/UI/Drawer/DrawerContainer';
import { ContentStyles } from '../components/UI/ThemeProperties';
import Paper from '@material-ui/core/Paper';
import { fetchBranch } from '../actions/branches';
import BranchDetailsContainer from '../components/Branch/BranchContainer';

const Branch = props => {
  const { classes, history } = props;
  const branch = props.branches.branch;
  const [mobileOpen, setDrawerState] = useState(false);
  //const details = props.branches.single;

  const handleDrawerToggle = () => {
    setDrawerState(!mobileOpen);
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
        {
          (branch) ?
            (<BranchDetailsContainer history={history}/>) : (<p>Loading...</p>)
        }
      </main>
    </div>
  );
};

Branch.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { branches: state.branches };
}

export default connect(mapStateToProps, { fetchBranch })(withStyles(ContentStyles, { withTheme: true })(withRouter(Branch)));



