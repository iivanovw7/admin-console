import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Branches } from '../UI/ThemeProperties';

let id = 0;

function createData(name, status, statusControl, branchControl) {
  id += 1;
  return { id, name, status, statusControl, branchControl };
}

const rows = [
  createData('Administrator', 'Active', 'Disable', 'Delete')
];

const  BranchesListContainer = props => {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>Name</TableCell>
            <TableCell className={classes.tableCell} align="center">Status</TableCell>
            <TableCell className={classes.tableCell} align="center"></TableCell>
            <TableCell className={classes.tableCell} align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" className={classes.tableCell}>
                {row.name}
              </TableCell>
              <TableCell className={classes.tableCell} align="center">{row.status}</TableCell>
              <TableCell className={classes.tableCell} align="center">{row.statusControl}</TableCell>
              <TableCell className={classes.tableCell} align="center">{row.branchControl}</TableCell>
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

export default withStyles(Branches)(BranchesListContainer);