import { Link, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeGroupStatus, deleteGroup, getGroups, getSingleGroup } from '../../actions';
import Warning from '../UI/Dialogs/Warning';
import AlertSnackbar from '../UI/Notifications/Snackbar';
import { Container } from '../UI/ThemeProperties';
import { actionButton } from './GroupsActionButton';
import { deleteButton } from './GroupsDeleteButton';

const GroupsContainer = props => {
  const { classes, history, dispatch, groups, page, limit } = props;
  const [confDialog, dialogState] = useState(false);
  const [groupToDelete, setToDelete] = useState(null);
  const currPage = page || 1;
  const currLimit = limit || 8;

  useEffect(() => {
    dialogState(false);
    setToDelete(null);
  }, []);

  function displayStatus(status) {
    return status ? 'Active' : 'Disabled';
  }

  function handleGroupClick(id) {
    dispatch(getSingleGroup(id, history));
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
        message={'All users of removed group will be assigned to "Other" group.'}
        request={() => {
          dialogState(false);
          dispatch(deleteGroup(groupToDelete, history));
        }}
        mainText={'You are about to DELETE group! Are you sure ?'}
      />
    );
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
        dispatch(getGroups(currPage, currLimit, history));
      }}
      success={success}
    />
  );

  //Function returns control buttons according to current elements state
  function showActionButton(row) {
    if (row.status) {
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
          {groups.map(row => (
            <TableRow key={row._id} className={classes.groupRowClass}>
              <TableCell component="th" scope="row" className={classes.groupNameCell}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    handleGroupClick(row._id);
                  }}
                >
                  {row.name}
                </Link>
              </TableCell>
              <TableCell className={classes.groupStatusCell} align="center">
                <strong>
                  {displayStatus(row.status)}
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

GroupsContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    errorMessage: state.groups.error,
    successMessage: state.groups.success,
    messageConfirmed: state.groups.confirmed
  };
}

export default connect(mapStateToProps, {
  getSingleGroup,
  deleteGroup,
  changeGroupStatus
})(withStyles(Container)(withRouter(GroupsContainer)));
