import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Wrapper } from '../components/UI/ThemeProperties';
import { getSingleRole } from '../actions/roles';
import RoleContainer from '../components/Role/RoleContainer';

const Role = props => {
  const { classes, history } = props;

  return (
    <main className={classes.contentSingle}>
      <Paper className={classes.titleContainer}>
        <div className={classes.selectorsContainer}>
          <h2>Create/Edit group</h2>
        </div>
      </Paper>
      <p style={{color: 'red'}}>{props.errorMessage}</p>
      <RoleContainer history={history}/>
    </main>
  );
};

Role.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    roles: state.roles,
    errorMessage: state.branches.error,
    successMessage: state.branches.success,
  };
}

export default connect(mapStateToProps, { getSingleRole })(withStyles(Wrapper, { withTheme: true })(withRouter(Role)));