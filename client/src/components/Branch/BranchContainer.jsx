import { Button, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { addNewBranch, updateBranch } from '../../actions';
import { CheckboxContainer, TextInputContainer } from '../UI/Forms/InputContainers';
import normalizePhone from '../UI/Forms/normalizer';
import { validateBranch } from '../UI/Forms/validate';
import AlertSnackbar from '../UI/Notifications/Snackbar.jsx';
import { Container } from '../UI/ThemeProperties';

const BranchContainer = props => {

  const { classes, history, handleSubmit, dispatch, branch } = props;

  useEffect(() => {
    props.initialize({
      name: branch.name || '',
      email: branch.email || '',
      phone: branch.phone || '',
      fax: branch.fax || '',
      address: branch.address || '',
      information: branch.information || '',
      status: branch.status || false
    });
  }, [branch]);

  const submit = formValues => {
    return !branch._id ? props.addNewBranch(formValues) : props.updateBranch(formValues, branch._id);
  };

  const showAlert = (message, success) => (
    <AlertSnackbar
      dispatch={dispatch}
      message={message}
      afterConfirm={() => {
        history.push(`/branches`);
      }}
      success={success}
    />
  );

  return (
    <Paper className={classes.root}>
      <form className={classes.branchPaper} onSubmit={handleSubmit(submit)}>
        <br/>
        <TextInputContainer dataType={'name'} type={'text'} required={true} rows={1}/>
        <TextInputContainer dataType={'email'} type={'email'} required={true} rows={1}/>
        <TextInputContainer
          dataType={'phone'}
          type={'phone'}
          required={true}
          rows={1}
          normalize={normalizePhone}
        />
        <TextInputContainer
          dataType={'fax'}
          type={'fax'}
          required={true}
          rows={1}
          normalize={normalizePhone}
        />
        <TextInputContainer dataType={'address'} required={true} type={'text'} rows={4}/>
        <TextInputContainer dataType={'information'} required={true} type={'text'} rows={4}/>
        <CheckboxContainer name={'status'} label={'Active'} value={''}/>
        {props.errorMessage && !props.messageConfirmed && (
          showAlert(props.errorMessage, false)
        )}
        {props.successMessage && !props.messageConfirmed && (
          showAlert(props.successMessage, true)
        )}
        <Grid container justify="flex-end" style={{ marginTop: '10px' }}>
          <Button
            variant="contained"
            color="primary"
            style={{ textTransform: 'none', margin: 5 }}
            onClick={() => {
              history.push(`/branches`);
            }}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ textTransform: 'none', margin: 5 }}
          >
            SAVE
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

BranchContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func
};

function mapStateToProps(state) {
  return {
    errorMessage: state.branches.error,
    successMessage: state.branches.success,
    messageConfirmed: state.branches.confirmed,
  };
}

const reduxFromBranch = reduxForm({
  validate: validateBranch,
  form: 'branch',
  fields: ['name', 'email', 'phone', 'fax', 'address', 'information', 'status']
})(BranchContainer);

export default connect(mapStateToProps, {
  addNewBranch,
  updateBranch
})(withStyles(Container)(reduxFromBranch));