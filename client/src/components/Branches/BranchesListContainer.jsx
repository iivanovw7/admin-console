import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Branches } from '../UI/ThemeProperties';
import { fetchBranch, fetchBranches } from '../../actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const BranchesListContainer = props => {
  const { classes, history, dispatch } = props;

  function displayStatus(status) {
    return (status) ? ('Active') : ('Disabled');
  }

  function handleBranchClick(id) {
    dispatch(fetchBranch(id, history));
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.nameCell}>Name</TableCell>
            <TableCell className={classes.addressCell} align="center">Address</TableCell>
            <TableCell className={classes.tableCell} align="center">Employees</TableCell>
            <TableCell className={classes.tableCell} align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.branches.list.output.map(row => (
            <TableRow key={row._id} onClick={() => {
              handleBranchClick(row._id);
            }} className={classes.rowClass}>
              <TableCell component="th" scope="row" className={classes.nameCell}>
                {row.name}
              </TableCell>
              <TableCell className={classes.addressCell} align="center">{row.address}</TableCell>
              <TableCell className={classes.tableCell} align="center">xxx</TableCell>
              <TableCell className={classes.tableCell}
                         align="center">{displayStatus(row.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

BranchesListContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { branches: state.branches };
}

export default connect(mapStateToProps, { fetchBranch })(withStyles(Branches)(withRouter(BranchesListContainer)));

