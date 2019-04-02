import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { Branches } from '../UI/ThemeProperties';
import { fetchBranch } from '../../actions/branches';
import { withRouter } from 'react-router-dom';

const BranchesContainer = props => {
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

BranchesContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { branches: state.branches };
}

export default connect(mapStateToProps, { fetchBranch })(withStyles(Branches)(withRouter(BranchesContainer)));

