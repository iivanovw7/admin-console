import { Button, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getRoles } from '../../actions/roles';
import { updateUser } from '../../actions/users';
import {
  CheckboxContainer,
  SelectInputContainer,
  TextInputContainer
} from '../UI/Forms/InputContainers';
import { validateUser } from '../UI/Forms/validate';
import AlertSnackbar from '../UI/Notifications/Snackbar.jsx';
import { Container } from '../UI/ThemeProperties';

const UserContainer = props => {
  const { classes, history, handleSubmit, user, roles, dispatch } = props;

  useEffect(() => {
    props.initialize({
      name: user.name || '',
      surname: user.surname || '',
      email: user.email || '',
      group: user.group || null,
      branch: user.branch || null,
      role: user.role ? user.role._id : 'Role',
      status: user.status || false
    });
  }, [user, roles]);

  const submit = formValues => {
    return props.updateUser(formValues, user._id);
  };

  const showAlert = (message, success) => (
    <AlertSnackbar
      message={message}
      dispatch={dispatch}
      afterConfirm={() => {
        history.push(`/users`);
      }}
      success={success}
    />
  );

  return (
    <Paper className={classes.root}>
      <form className={classes.branchPaper} onSubmit={handleSubmit(submit)}>
        <br/>
        <TextInputContainer dataType={'name'} type={'text'} rows={1} disabled={true}/>
        <TextInputContainer dataType={'surname'} type={'text'} rows={1} disabled={true}/>
        <TextInputContainer dataType={'email'} type={'text'} rows={1} disabled={true}/>
        {
          !roles ?
            <p>Loading...</p> :
            <SelectInputContainer dataType={'role'} list={roles} label={'Role'}
                                  Placeholder={'Role'}/>
        }
        <CheckboxContainer name={'status'} label={'Active'} value={''}/>
        {
          props.errorMessage && !props.messageConfirmed ?
            showAlert(props.errorMessage, false) : ''
        }
        {
          props.successMessage && !props.messageConfirmed ?
            showAlert(props.successMessage, true) : ''
        }
        <Grid container justify="flex-end" style={{ marginTop: '10px' }}>
          <Button
            variant="contained" color="primary"
            style={{ textTransform: 'none', margin: 5 }}
            onClick={() => {
              history.push(`/users`);
            }}>
            CANCEL
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={
              { textTransform: 'none', margin: 5 }
            }>
            SAVE
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

UserContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func
};

function mapStateToProps(state) {
  return {
    errorMessage: state.users.error,
    successMessage: state.users.success,
    messageConfirmed: state.users.confirmed
  };
}

const reduxFromGroup = reduxForm({
  validate: validateUser,
  form: 'user',
  fields: ['group', 'branch', 'role', 'status']
})(UserContainer);

export default connect(mapStateToProps, {
  updateUser,
  getRoles
})(withStyles(Container)(reduxFromGroup));