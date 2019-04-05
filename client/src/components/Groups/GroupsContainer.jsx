import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeGroupStatus, deleteGroup, getGroups, getSingleGroup } from '../../actions/groups';
import Warning from '../UI/Dialogs/Warning';
import { debounce } from '../UI/Forms/debounce';
import AlertSnackbar from '../UI/Notifications/Snackbar';
import { Container } from '../UI/ThemeProperties';


const GroupsContainer = props => {
  const { classes, history, dispatch } = props;
  const [confDialog, dialogState] = useState(false);
  const [groupToDelete, setToDelete] = useState(null);
  const currPage = props.groups.list.page || 1;
  const currLimit = props.groups.list.limit || 8;

  useEffect(() => {
    dialogState(false);
    setToDelete(null);
  }, []);

  function displayStatus(status) {
    return (status) ? ('Active') : ('Disabled');
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

  //Triggers notification if any there any messages in props
  function displayNotifications() {
    if (props.errorMessage) {
      return displayNotification(props.errorMessage, false);
    }
    if (props.successMessage) {
      return displayNotification(props.successMessage, true);
    }
  }

  //Returns notification container
  const displayNotification = (message, success) => {
    return (
      <AlertSnackbar
        message={message}
        afterConfirm={() => {
          dispatch(getGroups(currPage, currLimit, history));
        }}
        success={success}
      />
    );
  };

  const actionButton = (text, type, id) => {
    return (
      <Button
        color={type}
        className={classes.button}
        onClick={
          debounce(() => {
            (text === 'Delete') ?
              (handleDeleteAction(id))
              :
              (dispatch(changeGroupStatus(id, history)));
          }, 500)
        }
      >
        {text}
      </Button>
    );
  };

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
          {props.groups.list.output.map(row => (
            <TableRow key={row._id} className={classes.groupRowClass}>
              <TableCell component="th" scope="row" className={classes.groupNameCell}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    handleGroupClick(row._id, history);
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
                {
                  (row.status) ?
                    (actionButton('Disable', 'secondary', row._id))
                    :
                    (actionButton('Activate', 'primary', row._id))
                }
              </TableCell>
              <TableCell className={classes.groupDesktopCell} align="center">
                {
                  actionButton('Delete', 'secondary', row._id)
                }
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
    groups: state.groups,
    errorMessage: state.groups.error,
    successMessage: state.groups.success
  };
}

export default connect(mapStateToProps, {
  getSingleGroup,
  deleteGroup,
  changeGroupStatus,
  getGroups
})(withStyles(Container)(withRouter(GroupsContainer)));
