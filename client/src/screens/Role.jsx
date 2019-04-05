import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Wrapper } from '../components/UI/ThemeProperties';
import { getSingleRole } from '../actions/roles';
import RoleContainer from '../components/Role/RoleContainer';
import Spinner from '../components/UI/Spinner';

const Role = props => {
  const { classes, history } = props;
  const role = props.roles.role;

  return (
    <main className={classes.contentSingle}>
      <Paper className={classes.controlsContainer}>
        <div className={classes.selectorsContainer}>
          <h2>Create/Edit group</h2>
        </div>
      </Paper>
      {(!role) ? (<Spinner />) : (<RoleContainer history={history}/>)}
    </main>
  );
};

Role.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    roles: state.roles
  };
}

export default connect(mapStateToProps, { getSingleRole })(withStyles(Wrapper, { withTheme: true })(withRouter(Role)));