import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSingleRole } from '../actions';
import RoleContainer from '../components/Role/RoleContainer';
import { Wrapper } from '../components/UI/ThemeProperties';

const Role = props => {
  const { classes, history, dispatch } = props;

  return (
    <main className={classes.contentSingle}>
      <Paper className={classes.titleContainer}>
        <div className={classes.selectorsContainer}>
          <h2>Create/Edit group</h2>
        </div>
      </Paper>
      <p style={{ color: 'red' }}>{props.errorMessage && !props.messageConfirmed}</p>
      <RoleContainer history={history} dispatch={dispatch}/>
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
    errorMessage: state.roles.error,
    successMessage: state.roles.success,
    messageConfirmed: state.roles.confirmed
  };
}

export default connect(mapStateToProps, { getSingleRole })(withStyles(Wrapper, { withTheme: true })(withRouter(Role)));