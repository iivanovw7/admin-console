import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRoles } from '../../actions/roles';
import { getUsers, getSingleUser } from '../../actions/users';
import AlertSnackbar from '../UI/Notifications/Snackbar';
import { Container } from '../UI/ThemeProperties';
import { actionCheckBox } from './UsersActionCheckBox';

const UsersContainer = props => {
  const { classes, history, dispatch, users, limit, page } = props;
  const currPage = page || 1;
  const currLimit = limit || 8;
  console.log(props);

  useEffect(() => {
    props.dispatch(getRoles(1, 100, history));
  }, []);

  function displayStatus(status) {
    return status ? 'Active' : 'Disabled';
  }

  function handleUserClick(id) {
    dispatch(getSingleUser(id, history));
  }

  //Triggers notification if there are any messages in props
  function displayNotifications() {
    if (props.errorMessage) {
      return displayNotification(props.errorMessage, false);
    }
    if (props.successMessage) {
      return displayNotification(props.successMessage, true);
    }
  }

  //Returns notification container
  const displayNotification = (message, success) => (
    <AlertSnackbar
      message={message}
      afterConfirm={() => {
        dispatch(getUsers(currPage, currLimit, history));
      }}
      success={success}
    />
  );

  return (
    <Paper className={classes.root}>
      <Table className={classes.tables}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.userNameCell}>
              <h3>Name</h3>
            </TableCell>
            <TableCell className={classes.userEmailCell} align="center">
              <h3>Email</h3>
            </TableCell>
            <TableCell className={classes.userStatusCell} align="center">
              <h3>Status</h3>
            </TableCell>
            <TableCell className={classes.userControlCell} align="center">
              <h3>Deactivate</h3>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(row => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row" className={classes.userNameCell}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    handleUserClick(row._id, history);
                  }}
                >
                  {row.name} {row.surname}
                </Link>
              </TableCell>
              <TableCell className={classes.userEmailCell} align="center">
                {row.email}
              </TableCell>
              <TableCell className={classes.userStatusCell} align="center">
                <strong>
                  {displayStatus(row.status)}
                </strong>
              </TableCell>
              <TableCell className={classes.userControlCell} align="center">
                {actionCheckBox(row, classes, dispatch, history)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {displayNotifications()}
    </Paper>
  );
};

UsersContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    errorMessage: state.users.error,
    successMessage: state.users.success
  };
}

export default connect(mapStateToProps, { getUsers, getSingleUser })(withStyles(Container)(withRouter(UsersContainer)));