import { Link, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeUserStatus, getSingleUser, getUsers, searchUsers } from '../../actions/index';
import AlertSnackbar from '../UI/Notifications/Snackbar';
import { Container } from '../UI/ThemeProperties';
import { ActionCheckBox } from '../../components/UI/Checkbox';

const UsersContainer = props => {
  const { classes, history, dispatch, users, limit, page, search } = props;
  const currPage = page || 1;
  const currLimit = limit || 8;

  function displayStatus(status) {
    return status ? 'Active' : 'Disabled';
  }

  function handleUserClick(id) {
    dispatch(getSingleUser(id, history, true));
  }

  function handleStatusClick(row) {
    dispatch(changeUserStatus(row._id, !row.status, history));
  }

  //Triggers notification if there are any messages in props
  function displayNotifications() {
    if (props.errorMessage && !props.messageConfirmed) {
      return displayNotification(props.errorMessage, false);
    }
    if (props.successMessage && !props.messageConfirmed) {
      return displayNotification(props.successMessage, true);
    }
  }

  //Returns notification container
  const displayNotification = (message, success) => (

    <AlertSnackbar
      dispatch={dispatch}
      message={message}
      afterConfirm={() => {
        search ?
          dispatch(searchUsers(currPage, currLimit, search, history)) :
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
                <ActionCheckBox
                  status={row.status}
                  classes={classes}
                  handleClick={() => {handleStatusClick(row)}}
                />
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
    successMessage: state.users.success,
    messageConfirmed: state.users.confirmed
  };
}

export default connect(mapStateToProps)(withStyles(Container)(withRouter(UsersContainer)));
