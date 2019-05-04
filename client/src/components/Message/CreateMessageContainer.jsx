import { Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { logoutUser, sendMessage } from '../../actions';
import { branchAccess, fullAccess, groupAccess } from '../../constants/messagesAccess';
import { ifArrayContains, validateMessage } from '../../utils';
import { FormsButton } from '../UI/Forms/FormsButton';
import { SelectInputContainer, TextInputContainer } from '../UI/Forms/InputContainers';
import AlertSnackbar from '../UI/Notifications/Snackbar';
import { Switcher } from '../UI/Switcher';
import { Container } from '../UI/ThemeProperties';

const CreateMessageContainer = props => {

  const { classes, history, handleSubmit, message, user, dispatch } = props;

  const preselectDestination = () => {
    if (!user.role.code) {
      return (
        dispatch(logoutUser(history))
      );
    }
    if (ifArrayContains(user.role.code, branchAccess)) {
      return 'Branch';
    }
    return 'Group';
  };

  const [destination, setDestination] = useState(preselectDestination);

  const handleDestination = event => {
    setDestination(event.target.value);
  };

  useEffect(() => {
    props.initialize({
      subject: '',
      message: '',
      branch: user.branch ? user.branch._id : '',
      group: user.group ? user.group._id : '',
      sender: user._id
    });
  }, [message]);

  const submit = formValues => {
    dispatch(sendMessage(formValues, destination.toLocaleLowerCase()));
  };

  const showAlert = (message, success) => (
    <AlertSnackbar
      message={message}
      dispatch={dispatch}
      afterConfirm={() => {
        history.push(`/messages`);
      }}
      success={success}
    />
  );

  return (
    <Paper className={classes.root}>
      <form className={classes.branchPaper} onSubmit={handleSubmit(submit)}>
        <Switcher
          title={'Destination'}
          classes={classes}
          value={destination}
          handleSwitchAction={handleDestination}
          options={[
            { name: 'Branch', accessRights: ifArrayContains(user.role.code, branchAccess) },
            { name: 'Group', accessRights: ifArrayContains(user.role.code, groupAccess) }
          ]}
        />
        <div style={{ marginBottom: '20px', marginTop: '10px' }}>
          <SelectInputContainer
            dataType={destination.toLocaleLowerCase()}
            list={props[destination.toLocaleLowerCase()]}
            valueField={'_id'}
            label={destination}
            disabled={!ifArrayContains(user.role.code, fullAccess)}
          />
        </div>
        <TextInputContainer
          dataType={'subject'}
          type={'text'}
          rows={1}
          rowsMax={1}
          disabled={false}
          required={true}
        />
        <TextInputContainer
          dataType={'message'}
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
              history.push(`/messages`);
            }}
          />
          <FormsButton
            title={'SEND'}
            type={'submit'}
          />
        </Grid>
      </form>
    </Paper>
  );
};

CreateMessageContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.any,
  initialize: PropTypes.any,
  message: PropTypes.object.isRequired,
  messageConfirmed: PropTypes.bool.isRequired,
  successMessage: PropTypes.string,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    errorMessage: state.messages.error,
    successMessage: state.messages.success,
    messageConfirmed: state.messages.confirmed
  };
}

const reduxFromGroup = reduxForm({
  validate: validateMessage,
  form: 'message',
  fields: ['subject', 'message', 'sender', 'branch', 'group']
})(CreateMessageContainer);

export default connect(mapStateToProps, {
  logoutUser,
  sendMessage
})(withStyles(Container)(reduxFromGroup));
