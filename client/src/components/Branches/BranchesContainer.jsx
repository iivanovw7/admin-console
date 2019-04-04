import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Paper, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Container } from '../UI/ThemeProperties';
import { getSingleBranch } from '../../actions/branches';
import { withRouter } from 'react-router-dom';

const BranchesContainer = props => {
  const { classes, history, dispatch } = props;

  function displayStatus(status) {
    return (status) ? ('Active') : ('Disabled');
  }

  function handleBranchClick(id) {
    dispatch(getSingleBranch(id, history));
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.tables}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.nameCell}>Name</TableCell>
            <TableCell className={classes.addressCell} align="center">Address</TableCell>
            <TableCell className={classes.employeesCell} align="center">Employees</TableCell>
            <TableCell className={classes.tableCell} align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.branches.list.output.map(row => (
            <TableRow key={row._id}
                      onClick={() => {
                        handleBranchClick(row._id);
                      }} className={classes.rowClass}>
              <TableCell component="th" scope="row" className={classes.nameCell}>
                {row.name}
              </TableCell>
              <TableCell className={classes.addressCell} align="center">{row.address}</TableCell>
              <TableCell className={classes.employeesCell} align="center">xxx</TableCell>
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

export default connect(mapStateToProps, { getSingleBranch })(withStyles(Container)(withRouter(BranchesContainer)));