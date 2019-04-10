import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Spinner from '../components/UI/Spinner';
import { Wrapper } from '../components/UI/ThemeProperties';
import UserContainer from '../components/User/UserContainer';

const User = props => {
  const { classes, history, dispatch } = props;
  const user = props.users.user;
  const roles = props.roles.list.output;
  const groups = props.groups.list.output;
  const branches = props.branches.list.output;

  return (
    <main className={classes.contentSingle}>
      <Paper className={classes.titleContainer}>
        <div className={classes.selectorsContainer}>
          <h2>Edit user</h2>
        </div>
      </Paper>
      {
        !user ?
          <Spinner/> :
          <UserContainer
            user={user}
            roles={roles}
            groups={groups}
            branches={branches}
            history={history}
            dispatch={dispatch}
          />
      }
      <p style={{ color: 'red' }}>{props.errorMessage && !props.messageConfirmed}</p>
    </main>
  );
};

User.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users,
    roles: state.roles,
    branches: state.branches,
    groups: state.groups,
    errorMessage: state.users.error,
    successMessage: state.users.success,
    messageConfirmed: state.roles.confirmed
  };
}

export default connect(mapStateToProps, {})(withStyles(Wrapper, { withTheme: true })(withRouter(User)));