import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeRoleStatus, deleteRole, getRoles, getSingleRole } from '../../actions/roles';
import Warning from '../UI/Dialogs/Warning';
import AlertSnackbar from '../UI/Notifications/Snackbar';
import { Container } from '../UI/ThemeProperties';
import { actionButton } from './RolesActionButton';
import { deleteButton } from './RolesDeleteButton';

const RolesContainer = props => {
  const { classes, history, dispatch, roles, page, limit } = props;
  const [confDialog, dialogState] = useState(false);
  const [roleToDelete, setToDelete] = useState(null);
  const currPage = page || 1;
  const currLimit = limit || 8;

  useEffect(() => {
    dialogState(false);
    setToDelete(null);
  }, []);

  function displayStatus(status) {
    return status ? 'Active' : 'Disabled';
  }

  function handleRoleClick(id) {
    dispatch(getSingleRole(id, history));
  }

  function handleDeleteAction(id) {
    setToDelete(id);
    dialogState(true);
  }

  function DialogueWindow() {
    return (
      <Warning
        opened={confDialog}
        close={() => {
          dialogState(false);
        }}
        message={'Removed role will be removed for all users.'}
        request={() => {
          dialogState(false);
          dispatch(deleteRole(roleToDelete, history));
        }}
        mainText={'You are about to DELETE role! Are you sure ?'}
      />
    );
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
        dispatch(getRoles(currPage, currLimit, history));
      }}
      success={success}
    />
  );

  //Function returns control buttons according to current elements state
  function showActionButton(row) {
    if (row.active) {
      return actionButton('Disable', 'secondary', row, classes, dispatch);
    }
    return actionButton('Activate', 'primary', row, classes, dispatch);
  }

  //Function returns delete button with parameters
  function showDeleteButton(row) {
    return deleteButton(row, classes, handleDeleteAction);
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.tables}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.groupNameCell}>
              <h3>Name</h3>
            </TableCell>
            <TableCell className={classes.groupStatusCell} align="center">
              <h3>Status</h3>
            </TableCell>
            <TableCell className={classes.groupDesktopCell} align="center"/>
            <TableCell className={classes.groupDesktopCell} align="center"/>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map(row => (
            <TableRow key={row._id} className={classes.groupRowClass}>
              <TableCell component="th" scope="row" className={classes.groupNameCell}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    handleRoleClick(row._id, history);
                  }}
                >
                  {row.name}
                </Link>
              </TableCell>
              <TableCell className={classes.groupStatusCell} align="center">
                <strong>
                  {displayStatus(row.active)}
                </strong>
              </TableCell>
              <TableCell className={classes.groupDesktopCell} align="center">
                {showActionButton(row)}
              </TableCell>
              <TableCell className={classes.groupDesktopCell} align="center">
                {showDeleteButton(row)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {DialogueWindow()}
      {displayNotifications()}
    </Paper>
  );
};

RolesContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    errorMessage: state.roles.error,
    successMessage: state.roles.success
  };
}

export default connect(mapStateToProps, {
  getSingleRole,
  deleteRole,
  changeRoleStatus
})(withStyles(Container)(withRouter(RolesContainer)));
