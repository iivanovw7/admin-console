import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSingleBranch } from '../../actions/branches';
import { Container } from '../UI/ThemeProperties';

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
            <TableRow
              key={row._id}
              onClick={() => {
                handleBranchClick(row._id);
              }}
              className={classes.branchRowClass}
            >
              <TableCell
                component="th"
                scope="row"
                className={classes.branchNameCell}
              >
                {row.name}
              </TableCell>
              <TableCell className={classes.branchAddressCell} align="center">
                {row.address}
              </TableCell>
              <TableCell className={classes.branchEmployeesCell} align="center">xxx</TableCell>
              <TableCell className={classes.tableCell} align="center">
                <strong>
                  {displayStatus(row.status)}
                </strong>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

BranchesContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null, { getSingleBranch })(withStyles(Container)(withRouter(BranchesContainer)));