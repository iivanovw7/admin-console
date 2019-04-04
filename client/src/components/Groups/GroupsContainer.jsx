import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeGroupStatus, deleteGroup, getGroups, getSingleGroup } from '../../actions/groups';
import { debounce } from '../UI/Forms/debounce.js';
import AlertSnackbar from '../UI/Notifications/Snackbar.jsx';
import { Container } from '../UI/ThemeProperties';

const GroupsContainer = props => {
  const { classes, history, dispatch } = props;
  const currPage = props.groups.list.page || 1;
  const currLimit = props.groups.list.limit || 8;

  function displayStatus(status) {
    return (status) ? ('Active') : ('Disabled');
  }

  function handleGroupClick(id) {
    dispatch(getSingleGroup(id, history));
  }

  const showAlert = (message, success) => {
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
              (dispatch(deleteGroup(id, history)))
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
                  ((row.status)) ?
                    (actionButton('Disable', 'secondary', row._id))
                    :
                    (actionButton('Activate', 'primary', row._id))
                }
              </TableCell>
              <TableCell className={classes.groupDesktopCell} align="center">
                {actionButton('Delete', 'secondary', row._id)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {
        (props.errorMessage) ?
          (showAlert(props.errorMessage, false)) : ('')
      }
      {
        (props.successMessage) ?
          (showAlert(props.successMessage, true)) : ('')
      }
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