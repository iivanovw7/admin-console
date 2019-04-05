import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSingleBranch } from '../actions/branches';
import BranchContainer from '../components/Branch/BranchContainer';
import { Wrapper } from '../components/UI/ThemeProperties';
import Spinner from '../components/UI/Spinner';

const Branch = props => {
  const { classes, history } = props;
  const branch = props.branches.branch;

  return (
    <main className={classes.contentSingle}>
      <Paper className={classes.controlsContainer}>
        <div className={classes.selectorsContainer}>
          <h2>Create/Edit branch</h2>
        </div>
      </Paper>
      {(!branch) ? (<Spinner />) : (<BranchContainer history={history}/>)}
    </main>
  );
};

Branch.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { branches: state.branches };
}

export default connect(mapStateToProps, { getSingleBranch })(withStyles(Wrapper, { withTheme: true })(withRouter(Branch)));