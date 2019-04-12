import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSingleBranch } from '../actions';
import BranchContainer from '../components/Branch/BranchContainer';
import { Wrapper } from '../components/UI/ThemeProperties';


const Branch = props => {
  const { classes, history, dispatch } = props;
  const branch = props.branches.branch;

  return (
    <main className={classes.contentSingle}>
      <Paper className={classes.titleContainer}>
        <div className={classes.selectorsContainer}>
          <h2>Create/Edit branch</h2>
        </div>
      </Paper>
      <BranchContainer branch={branch} history={history} dispatch={dispatch}/>
      <p style={{ color: 'red' }}>
        {props.errorMessage && !props.messageConfirmed}
      </p>
    </main>
  );
};

Branch.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  messageConfirmed: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    branches: state.branches,
    errorMessage: state.branches.error,
    successMessage: state.branches.success,
    messageConfirmed: state.branches.confirmed
  };
}

export default connect(mapStateToProps, { getSingleBranch })(withStyles(Wrapper, { withTheme: true })(withRouter(Branch)));