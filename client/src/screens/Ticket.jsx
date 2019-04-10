import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Spinner from '../components/UI/Spinner';
import { Wrapper } from '../components/UI/ThemeProperties';
import TicketContainer from '../components/Ticket/TicketContainer';

const Ticket = props => {
  const { classes, history, dispatch } = props;
  const ticket = props.tickets.ticket;

  return (
    <main className={classes.contentSingle}>
      <Paper className={classes.titleContainer}>
        <div className={classes.selectorsContainer}>
          <p>Ticket:&nbsp;</p>
          {!ticket ? <h4>&nbsp;Unknown</h4> : <h4>&nbsp;{ticket.subject}</h4>}
        </div>
      </Paper>
      {
        !ticket ?
          <Spinner/> :
          <TicketContainer
            ticket={ticket}
            history={history}
            dispatch={dispatch}
          />
      }
      <p style={{ color: 'red' }}>{props.errorMessage && !props.messageConfirmed}</p>
    </main>
  );
};

Ticket.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    tickets: state.tickets,
    errorMessage: state.users.error,
    successMessage: state.users.success,
    messageConfirmed: state.roles.confirmed
  };
}

export default connect(mapStateToProps, {})(withStyles(Wrapper, { withTheme: true })(withRouter(Ticket)));