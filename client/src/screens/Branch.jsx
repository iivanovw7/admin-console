import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSingleBranch } from '../actions/branches';
import BranchContainer from '../components/Branch/BranchContainer';
import { Wrapper } from '../components/UI/ThemeProperties';


const Branch = props => {
  const { classes, history } = props;

  return (
    <main className={classes.contentSingle}>
      <Paper className={classes.titleContainer}>
        <div className={classes.selectorsContainer}>
          <h2>Create/Edit branch</h2>
        </div>
      </Paper>
      <BranchContainer history={history}/>
      <p style={{color: 'red'}}>{props.errorMessage}</p>
    </main>
  );
};

Branch.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    branches: state.branches,
    errorMessage: state.branches.error,
    successMessage: state.branches.success,
  };
}

export default connect(mapStateToProps, { getSingleBranch })(withStyles(Wrapper, { withTheme: true })(withRouter(Branch)));