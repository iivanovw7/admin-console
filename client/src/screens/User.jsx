import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getBranches, getGroups, getRoles } from '../actions';
import Spinner from '../components/UI/Spinner';
import { Wrapper } from '../components/UI/ThemeProperties';
import UserContainer from '../components/User/UserContainer';

const User = props => {
  const { classes, history, dispatch } = props;
  const user = props.users.user;
  const roles = props.roles.list.output;
  const groups = props.groups.list.output;
  const branches = props.branches.list.output;

  useEffect(() => {
    dispatch(getGroups(1, 100, history));
    dispatch(getBranches(1, 100, history));
    dispatch(getRoles(1, 100, history));
  }, []);

  const renderUserContainer = () => (
    <UserContainer
      user={user}
      roles={roles}
      groups={groups}
      branches={branches}
      history={history}
      dispatch={dispatch}
    />
  );

  return (
    <main className={classes.contentSingle}>
      <Paper className={classes.titleContainer}>
        <div className={classes.selectorsContainer}>
          <h2>Edit user</h2>
        </div>
      </Paper>
      {!user || !groups || !branches || !roles ? <Spinner/> : renderUserContainer()}
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
    groups: state.groups
  };
}

export default connect(mapStateToProps)(withStyles(Wrapper, { withTheme: true })(withRouter(User)));
