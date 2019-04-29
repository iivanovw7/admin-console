import { Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getBranches, getGroups, getRoles, updateUser } from '../../actions';
import { FormsButton } from '../UI/Forms/FormsButton';
import {
  CheckboxContainer,
  SelectInputContainer,
  TextInputContainer
} from '../UI/Forms/InputContainers';
import AlertSnackbar from '../UI/Notifications/Snackbar.jsx';
import { Container } from '../UI/ThemeProperties';

const UserContainer = props => {
  const { classes, history, handleSubmit, user, roles, branches, groups, dispatch } = props;

  useEffect(() => {
    props.initialize({
      name: user.name || '',
      surname: user.surname || '',
      email: user.email || '',
      group: user.group ? user.group._id : 'Group',
      branch: user.branch ? user.branch._id : 'Branch',
      role: user.role ? user.role._id : 'Role',
      status: user.status || false
    });
  }, [user, roles, branches, groups]);

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
        <TextInputContainer dataType={'name'} type={'text'} rows={1} rowsMax={1} disabled={true}/>
        <TextInputContainer
          dataType={'surname'}
          type={'text'}
          rows={1}
          rowsMax={1}
          disabled={true}
        />
        <TextInputContainer dataType={'email'} type={'text'} rows={1} rowsMax={1} disabled={true}/>
        {groups && (
          <SelectInputContainer
            dataType={'group'}
            list={groups}
            valueField={'_id'}
            label={'Group'}
          />
        )}
        {branches && (
          <SelectInputContainer
            dataType={'branch'}
            list={branches}
            valueField={'_id'}
            label={'Branch'}
          />
        )}
        {roles && (
          <SelectInputContainer
            dataType={'role'}
            list={roles}
            valueField={'_id'}
            label={'Role'}
          />
        )}
        <CheckboxContainer
          name={'status'}
          label={'Active'}
          value={''}
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
              history.push(`/users`);
            }}
          />
          <FormsButton title={'SAVE'} type={'submit'}/>
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
  form: 'user',
  fields: ['group', 'branch', 'role', 'status']
})(UserContainer);

export default connect(mapStateToProps, {
  updateUser,
  getRoles,
  getGroups,
  getBranches
})(withStyles(Container)(reduxFromGroup));
