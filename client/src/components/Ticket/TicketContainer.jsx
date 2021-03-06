import { Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { updateTicket } from '../../actions';
import { statuses } from '../../constants/ticketStatuses';
import { validateTicket } from '../../utils/formsValidator';
import { FormsButton } from '../UI/Forms/FormsButton';
import { SelectInputContainer, TextInputContainer } from '../UI/Forms/InputContainers';
import AlertSnackbar from '../UI/Notifications/Snackbar.jsx';
import { Container } from '../UI/ThemeProperties';

const TicketContainer = props => {
  const { classes, history, handleSubmit, ticket, dispatch } = props;
  const disabledTextInputs = ['author', 'branch', 'message', 'created', 'closed'];

  useEffect(() => {
    props.initialize({
      author: ticket.authorId ? ticket.authorId.name + ' ' + ticket.authorId.surname : 'Author',
      branch: ticket.branchId ? ticket.branchId.name : 'No branch assigned!',
      created: moment(ticket.created).format('HH:MM DD.MM.YYYY'),
      message: ticket.message ? ticket.message : 'Message',
      status: ticket.status ? ticket.status : 'Opened',
      closed: ticket.closed ? moment(ticket.closed).format('HH:MM DD.MM.YYYY') : null,
      note: ticket.note ? ticket.note : 'Ticket note...'
    });
  }, [ticket]);

  const submit = formValues => {
    return props.updateTicket(formValues, ticket._id);
  };

  const showAlert = (message, success) => (
    <AlertSnackbar
      message={message}
      dispatch={dispatch}
      afterConfirm={() => {
        history.push(`/tickets`);
      }}
      success={success}
    />
  );

  return (
    <Paper className={classes.root}>
      <form className={classes.branchPaper} onSubmit={handleSubmit(submit)}>
        <br/>
        {disabledTextInputs.map(
          input => (
            <TextInputContainer
              className={
                (ticket.closed && input === 'closed') || (input !== 'closed') ?
                  classes.block : classes.hidden
              }
              key={input}
              dataType={input}
              type={'text'}
              rows={input === 'message' ? 4 : 1}
              rowsMax={input === 'message' ? 12 : 1}
              disabled={true}
              required={false}
            />
          ))
        }
        <div style={{ marginBottom: '20px', marginTop: '10px' }}>
          <SelectInputContainer
            dataType={'status'}
            list={statuses}
            label={'Status'}
            valueField={'name'}
          />
        </div>
        <TextInputContainer
          dataType={'note'}
          type={'text'}
          rows={4}
          rowsMax={12}
          disabled={false}
          required={true}
        />
        {props.errorMessage && !props.messageConfirmed && (
          showAlert(props.errorMessage, false)
        )}
        {props.successMessage && !props.messageConfirmed && (
          showAlert(props.successMessage, true)
        )}
        <Grid container justify="flex-end" style={{ marginTop: '10px' }}>
          <FormsButton
            title={'CANCEL'}
            handleClick={() => {
              history.push(`/tickets`);
            }}
          />
          <FormsButton title={'UPDATE'} type={'submit'}/>
        </Grid>
      </form>
    </Paper>
  );
};

TicketContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func
};

function mapStateToProps(state) {
  return {
    errorMessage: state.tickets.error,
    successMessage: state.tickets.success,
    messageConfirmed: state.tickets.confirmed
  };
}

const reduxFromGroup = reduxForm({
  validate: validateTicket,
  form: 'ticket',
  fields: ['status', 'note']
})(TicketContainer);

export default connect(mapStateToProps, {
  updateTicket
})(withStyles(Container)(reduxFromGroup));
