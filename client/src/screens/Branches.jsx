import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import { reduxForm } from 'redux-form';
import { validate } from '../components/Login/InputValidation';
import AppBarContainer from '../components/UI/AppBar/AppBarContainer';
import DrawerContainer from '../components/UI/Drawer/DrawerContainer';
import { ContentStyles, LoginFormStyles, NavigationStyles } from '../components/UI/ThemeProperties';
import BranchesListContainer from '../components/Branches/BranchesListContainer';
import { LimitSelector } from '../components/UI/LimitSelector';
import { PageSelector } from '../components/UI/PageSelector';
import AddNewButton from '../components/UI/AddNewButton';
import Paper from '@material-ui/core/Paper';
import { fetchBranches } from '../actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Branches = props => {

  const { classes, history } = props;
  const limits = [10, 20, 30];
  const [mobileOpen, setDrawerState] = useState(false);
  const [currLimit, selectLimit] = useState(limits[0]);

  useState(() => {props.dispatch(fetchBranches(1, currLimit, history))});

  const handleDrawerToggle = () => {
    setDrawerState(!mobileOpen);
  };

  const handleLimit = event => {
    selectLimit(event.target.value);
    return props.dispatch(fetchBranches(props.branches.list.page, currLimit, history));
  };

  const handlePage = (newPage) => {
    return props.dispatch(fetchBranches(newPage, currLimit, history));
  };

  console.log(props.branches)

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
        <h2>Branches</h2>
        <Paper className={classes.controlsContainer}>
          <div className={classes.selectorsContainer}>
            <PageSelector classes={classes} data={props.branches} handlePage={handlePage}/>
            <LimitSelector classes={classes} limit={currLimit} handleLimit={handleLimit}
                           limits={limits}/>
          </div>
          <AddNewButton classes={classes}/>
        </Paper>
        <BranchesListContainer/>
        <button onClick={() => {
          props.dispatch(fetchBranches(1, 10, history));
        }}>GET
        </button>
        <button onClick={() => {
          console.log(props);
        }}>1
        </button>
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

