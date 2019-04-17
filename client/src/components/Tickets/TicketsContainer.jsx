import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSingleTicket } from '../../actions';
import { Container } from '../UI/ThemeProperties';

const TicketsContainer = props => {
  const { classes, history, dispatch, tickets } = props;

  function handleTicketClick(id) {
    dispatch(getSingleTicket(id, history));
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
              <h3>Status</h3>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map(row => (
            <TableRow
              key={row._id}
              onClick={() => {
                handleTicketClick(row._id);
              }}
              className={classes.branchRowClass}
            >
              <TableCell
                component="th"
                scope="row"
                className={classes.ticketsNameCell}
              >
                {row.authorId.name + ' ' + row.authorId.surname}
              </TableCell>
              <TableCell className={classes.ticketsSubjectCell} align="center">
                {row.subject}
              </TableCell>
              <TableCell className={classes.ticketsDateCell} align="center">
                {moment(row.created).format('HH:MM DD.MM.YYYY')}
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                <strong>
                  {row.status}
                </strong>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

TicketsContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null, { getSingleTicket })(withStyles(Container)(withRouter(TicketsContainer)));