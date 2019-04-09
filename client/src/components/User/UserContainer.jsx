import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getRoles } from '../../actions/roles';
import { updateUser } from '../../actions/users';
import { CheckboxContainer, TextInputContainer, SelectInputContainer } from '../UI/Forms/InputContainers';
import { validateUser } from '../UI/Forms/validate';
import AlertSnackbar from '../UI/Notifications/Snackbar.jsx';
import { Container } from '../UI/ThemeProperties';

const UserContainer = props => {
  const { classes, history, handleSubmit } = props;
  const user = props.users.user;
  const roles = props.roles.list.output;

  useEffect(() => {
    props.dispatch(getRoles(1, 100, history));
    props.initialize({
      name: user.name || '',
      surname: user.surname || '',
      email: user.email || '',
      group: user.group || null,
      branch: user.branch || null,
      role: user.role || '',
      status: user.status || false
    });
  }, [user]);

  const submit = formValues => {
    return props.updateUser(formValues, user._id);
  };

  const showAlert = (message, success) => (
    <AlertSnackbar
      message={message}
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
          <p>Loading...</p> : <SelectInputContainer dataType={'role'} list={roles} value={user.role} label={'Role'}/>
        }
        <CheckboxContainer name={'status'} label={'Active'} value={''}/>
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
    users: state.users,
    groups: state.groups,
    roles: state.roles
  };
}

const reduxFromGroup = reduxForm({
  validate: validateUser,
  form: 'user',
  fields: ['group', 'branch', 'role', 'status']
})(UserContainer);

export default connect(mapStateToProps, {
  updateUser,
  getRoles,
})(withStyles(Container)(reduxFromGroup));