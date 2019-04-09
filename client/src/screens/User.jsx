import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSingleUser } from '../actions/users';
import { Wrapper } from '../components/UI/ThemeProperties';
import UserContainer from '../components/User/UserContainer';
import Spinner from '../components/UI/Spinner';

const User = props => {
  const { classes, history } = props;
  const user = props.users.user;

  return (
    <main className={classes.contentSingle}>
      <Paper className={classes.titleContainer}>
        <div className={classes.selectorsContainer}>
          <h2>Edit user</h2>
        </div>
      </Paper>
      {!user ? <Spinner /> : <UserContainer history={history}/>}
      <p style={{color: 'red'}}>{props.errorMessage}</p>
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
    errorMessage: state.branches.error,
    successMessage: state.branches.success,
  };
}

export default connect(mapStateToProps, { getSingleUser })(withStyles(Wrapper, { withTheme: true })(withRouter(User)));