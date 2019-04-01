import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import AppBarContainer from '../components/UI/AppBar/AppBarContainer';
import DrawerContainer from '../components/UI/Drawer/DrawerContainer';
import { ContentStyles } from '../components/UI/ThemeProperties';
import BranchesListContainer from '../components/Branches/BranchesListContainer';
import { PageSelector } from '../components/UI/PageSelector';
import AddNewButton from '../components/UI/AddNewButton';
import Paper from '@material-ui/core/Paper';
import { fetchBranches } from '../actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Branches = props => {

  const { classes, history } = props;
  const limit = [8];
  const [mobileOpen, setDrawerState] = useState(false);
  const list = props.branches.list.output;

  useState(() => {
    props.dispatch(fetchBranches(1, limit, history));
  });

  const handleDrawerToggle = () => {
    setDrawerState(!mobileOpen);
  };

  const handlePage = (newPage) => {
    return props.dispatch(fetchBranches(newPage, limit, history));
  };

  return (
    <div className={classes.root}>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>Admin console - Branches</title>
        <link rel="canonical" href=""/>
      </Helmet>
      <CssBaseline/>
      <AppBarContainer handleDrawerToggle={handleDrawerToggle} dispatch={props.dispatch}/>
      <DrawerContainer handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen}/>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Paper className={classes.controlsContainer}>
          <div className={classes.selectorsContainer}>
            <h2>Branches</h2>
          </div>
          <AddNewButton classes={classes}/>
        </Paper>
        {(list) ? (<BranchesListContainer />) : (<p>Loading...</p>)}
        <br/>
        <Paper className={classes.controlsContainer}>
          <div/>
          <PageSelector classes={classes} data={props.branches} handlePage={handlePage}/>
        </Paper>
      </main>
    </div>
  );
};

Branches.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { branches: state.branches };
}

export default connect(mapStateToProps, { fetchBranches })(withStyles(ContentStyles, { withTheme: true })(withRouter(Branches)));

