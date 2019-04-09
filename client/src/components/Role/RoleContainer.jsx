import { Button, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { addNewRole, updateRole } from '../../actions/roles';
import { CheckboxContainer, TextInputContainer } from '../UI/Forms/InputContainers';
import { validateRole } from '../UI/Forms/validate';
import AlertSnackbar from '../UI/Notifications/Snackbar.jsx';
import { Container } from '../UI/ThemeProperties';

const RoleContainer = props => {

  const { classes, history, handleSubmit, dispatch } = props;
  const role = props.roles.role;

  useEffect(() => {
    props.initialize({
      name: role.name || '',
      code: role.code || '',
      description: role.description || '',
      active: role.active || false,
      isPublic: role.isPublic || false,
      isEditable: role.isEditable || false
    });
  }, [role]);

  const submit = formValues => {
    return !role._id ?
      props.addNewRole(formValues) : props.updateRole(formValues, role._id);
  };

  const showAlert = (message, success) => (
    <AlertSnackbar
      dispatch={dispatch}
      message={message}
      afterConfirm={() => {
        history.push(`/roles`);
      }}
      success={success}
    />
  );

  return (
    <Paper className={classes.root}>
      <form className={classes.branchPaper} onSubmit={handleSubmit(submit)}>
        <br/>
        <TextInputContainer dataType={'name'} type={'text'} rows={1}/>
        <TextInputContainer dataType={'code'} type={'text'} rows={1}/>
        <TextInputContainer dataType={'description'} type={'text'} rows={4}/>
        <CheckboxContainer name={'isPublic'} label={'Public'} value={''}/>
        <CheckboxContainer name={'isEditable'} label={'Editable'} value={''}/>
        <CheckboxContainer name={'active'} label={'Active'} value={''}/>
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
              history.push(`/roles`);
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

RoleContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func
};

function mapStateToProps(state) {
  return {
    errorMessage: state.roles.error,
    successMessage: state.roles.success,
    messageConfirmed: state.roles.confirmed,
    roles: state.roles
  };
}

const reduxFromGroup = reduxForm({
  validate: validateRole,
  form: 'role',
  fields: ['name', 'code', 'description', 'active', 'isPublic', 'isEditable']
})(RoleContainer);

export default connect(mapStateToProps, {
  addNewRole,
  updateRole
})(withStyles(Container)(reduxFromGroup));