import { Button, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { addNewGroup, updateGroup } from '../../actions/groups';
import { CheckboxContainer, TextInputContainer } from '../UI/Forms/InputContainers';
import { validateGroup } from '../UI/Forms/validate';
import AlertSnackbar from '../UI/Notifications/Snackbar.jsx';
import { Container } from '../UI/ThemeProperties';

const GroupContainer = props => {

  const { classes, history, handleSubmit } = props;
  const group = props.groups.group;

  useEffect(() => {
    props.initialize({
      name: group.name || '',
      description: group.description || '',
      permissions: group.permissions || false,
      status: group.status || false
    });
  }, [group]);

  const submit = formValues => {
    return !group._id ?
      props.addNewGroup(formValues) : props.updateGroup(formValues, group._id);
  };

  const showAlert = (message, success) => (
    <AlertSnackbar
      message={message}
      afterConfirm={() => {
        history.push(`/groups`);
      }}
      success={success}
    />
  );

  return (
    <Paper className={classes.root}>
      <form className={classes.branchPaper} onSubmit={handleSubmit(submit)}>
        <br/>
        <TextInputContainer dataType={'name'} type={'text'} rows={1}/>
        <TextInputContainer dataType={'description'} type={'text'} rows={4}/>
        <CheckboxContainer name={'permissions'} label={'Available for permissions'} value={''}/>
        <CheckboxContainer name={'status'} label={'Active'} value={''}/>
        {
          props.errorMessage ?
            showAlert(props.errorMessage, false) : ''
        }
        {
          props.successMessage ?
            showAlert(props.successMessage, true) : ''
        }
        <Grid container justify="flex-end" style={{ marginTop: '10px' }}>
          <Button
            variant="contained" color="primary"
            style={{ textTransform: 'none', margin: 5 }}
            onClick={() => {
              history.push(`/groups`);
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

GroupContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func
};

function mapStateToProps(state) {
  return {
    errorMessage: state.groups.error,
    successMessage: state.groups.success,
    groups: state.groups
  };
}

const reduxFromGroup = reduxForm({
  validate: validateGroup,
  form: 'group',
  fields: ['name', 'description', 'permissions', 'status']
})(GroupContainer);

export default connect(mapStateToProps, {
  addNewGroup,
  updateGroup
})(withStyles(Container)(reduxFromGroup));