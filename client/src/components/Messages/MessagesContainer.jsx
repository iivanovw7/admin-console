import { Link, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteMessage, getMessages, getSingleMessage } from '../../actions';
import { deleteButton } from '../Messages/MessagesDeleteButton';
import Warning from '../UI/Dialogs/Warning';
import AlertSnackbar from '../UI/Notifications/Snackbar';
import { Container } from '../UI/ThemeProperties';

const MessagesContainer = props => {
  const { classes, history, dispatch, messages, page, limit } = props;
  const [confDialog, dialogState] = useState(false);
  const [msgToDelete, setToDelete] = useState(null);
  const currPage = page || 1;
  const currLimit = limit || 8;

  function handleDeleteAction(id) {
    setToDelete(id);
    dialogState(true);
  }

  function handleMessageClick(id) {
    dispatch(getSingleMessage(id, history));
  }

  function DialogueWindow() {
    return (
      <Warning
        opened={confDialog}
        close={() => {
          dialogState(false);
        }}
        message={'Message will be removed and you will not be able to restore it.'}
        request={() => {
          dialogState(false);
          dispatch(deleteMessage(msgToDelete, history));
        }}
        mainText={'You are about to DELETE message! Are you sure ?'}
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
        dispatch(getMessages(currPage, currLimit, history));
      }}
      success={success}
    />
  );

  //Function returns delete button with parameters
  function showDeleteButton(row) {
    return deleteButton(row, classes, handleDeleteAction);
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.tables}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.ticketsNameCell}>
              <h3>Name</h3>
            </TableCell>
            <TableCell className={classes.ticketsSubjectCell} align="center">
              <h3>Subject</h3>
            </TableCell>
            <TableCell className={classes.ticketsDateCell} align="center">
              <h3>Date</h3>
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map(row => (
            <TableRow key={row._id}>
              <TableCell
                component="th"
                scope="row"
                className={classes.ticketsNameCell}
              >
                {row.senderId.name + ' ' + row.senderId.surname}
              </TableCell>
              <TableCell className={classes.ticketsSubjectCell} align="center">
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    handleMessageClick(row._id);
                  }}
                >
                  {row.subject}
                </Link>
              </TableCell>
              <TableCell className={classes.ticketsDateCell} align="center">
                {moment(row.created).format('HH:MM DD.MM.YYYY')}
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
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

MessagesContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    errorMessage: state.messages.error,
    successMessage: state.messages.success,
    messageConfirmed: state.messages.confirmed
  };
}

export default connect(mapStateToProps)(withStyles(Container)(withRouter(MessagesContainer)));
