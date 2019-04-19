import { CircularProgress, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TicketContainer from '../components/Ticket/TicketContainer';
import Spinner from '../components/UI/Spinner';
import { Wrapper } from '../components/UI/ThemeProperties';

const Ticket = props => {
  const { classes, history, dispatch } = props;
  const ticket = props.tickets.ticket;

  const renderTicketContainer = () => (
    <TicketContainer
      ticket={ticket}
      history={history}
      dispatch={dispatch}
    />
  );

  return (
    <main className={classes.contentSingle}>
      <Paper className={classes.titleContainer}>
        <div className={classes.selectorsContainer}>
          <p>Ticket:&nbsp;</p>
          {!ticket ? <CircularProgress size={24}/> : <h4>&nbsp;{ticket.subject}</h4>}
        </div>
      </Paper>
      {!ticket ? <Spinner/> : renderTicketContainer()}
    </main>
  );
};

Ticket.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    tickets: state.tickets
  };
}

export default connect(mapStateToProps, {})(withStyles(Wrapper, { withTheme: true })(withRouter(Ticket)));