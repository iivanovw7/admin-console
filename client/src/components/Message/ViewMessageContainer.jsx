import { Grid, Paper, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { FormsButton } from '../UI/Forms/FormsButton';
import { Container } from '../UI/ThemeProperties';

const ViewMessageContainer = props => {
  const { classes, history, message } = props;
  const sender = message.senderId.name + ' ' + message.senderId.surname;
  const created = moment(message.created).format('HH:MM DD.MM.YYYY');

  return (
    <Paper className={classes.root}>
      <div className={classes.branchPaper}>
        <TextField
          style={{ width: '100%' }}
          label='Sender'
          value={sender}
          margin='normal'
          variant='outlined'
          disabled={true}
        />
        {message.branchId && (
          <TextField
            style={{ width: '100%' }}
            label='Branch'
            value={message.branchId.name}
            margin='normal'
            variant='outlined'
            disabled={true}
          />
        )}
        {message.groupId && (
          <TextField
            style={{ width: '100%' }}
            label='Group'
            value={message.groupId.name}
            margin='normal'
            variant='outlined'
            disabled={true}
          />
        )}
        <TextField
          style={{ width: '100%' }}
          label='Created'
          value={created}
          margin='normal'
          variant='outlined'
          disabled={true}
        />
        <TextField
          style={{ width: '100%' }}
          label='Message'
          value={message.message}
          margin='normal'
          variant='outlined'
          disabled={true}
          multiline
          rows='4'
          rowsMax='12'
        />
        <Grid container justify='flex-end' style={{ marginTop: '10px' }}>
          <FormsButton
            title={'BACK'}
            handleClick={() => {
              history.push(`/messages`);
            }}
          />
        </Grid>
      </div>
    </Paper>
  );
};

ViewMessageContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired
};

export default withStyles(Container)(ViewMessageContainer);

