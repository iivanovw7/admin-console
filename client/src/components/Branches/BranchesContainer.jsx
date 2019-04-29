import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSingleBranch } from '../../actions';
import { Container } from '../UI/ThemeProperties';
import { BranchesContainerElement } from './BranchesContainerElement';

const BranchesContainer = props => {
  const { classes, history, dispatch, branches } = props;

  function displayStatus(status) {
    return status ? 'Active' : 'Disabled';
  }

  function handleBranchClick(id) {
    dispatch(getSingleBranch(id, history));
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.tables}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.branchNameCell}>
              <h3>Name</h3>
            </TableCell>
            <TableCell className={classes.branchAddressCell} align="center">
              <h3>Address</h3>
            </TableCell>
            <TableCell className={classes.branchEmployeesCell} align="center">
              <h3>Employees</h3>
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              <h3>Status</h3>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {branches.map(row => (
            <BranchesContainerElement
              key={row._id}
              displayStatus={displayStatus}
              handleBranchClick={handleBranchClick}
              row={row}
              classes={classes}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

BranchesContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null)(withStyles(Container)(withRouter(BranchesContainer)));
