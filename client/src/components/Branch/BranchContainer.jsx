import { Button, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { TextInputContainer, CheckboxContainer } from './Form/InputContainers';
import { errorMessage } from './Form/ErrorMessage';
import { validate } from './Form/Validation';
import { Branches } from '../UI/ThemeProperties';
import { addBranch, updateBranch } from '../../actions/branches';
import normalizePhone from './Form/Normalizer';
import AlertSnackbar from '../UI/Notifications/Snackbar.jsx';

const BranchContainer = props => {

  const { classes, history, handleSubmit } = props;
  const branch = props.branches.branch;

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

  const submit = (formValues) => {
    return (!branch._id) ?
      (props.addBranch(formValues, history)) : (props.updateBranch(formValues, branch._id, history));
  };

  const showAlert = (message) => {
    return (
      <AlertSnackbar
        message={message}
        afterConfirm={() => {
          history.push(`/branches`);
        }}
      />
    );
  };

  return (
    <Paper className={classes.root}>
      <form className={classes.branchPaper} onSubmit={handleSubmit(submit)}>
        <br/>
        <TextInputContainer dataType={'name'} type={'text'} rows={1}/>
        <TextInputContainer dataType={'email'} type={'email'} rows={1}/>
        <TextInputContainer dataType={'phone'} type={'phone'} rows={1} normalize={normalizePhone}/>
        <TextInputContainer dataType={'fax'} type={'fax'} rows={1} normalize={normalizePhone}/>
        <TextInputContainer dataType={'address'} type={'text'} rows={4}/>
        <TextInputContainer dataType={'information'} type={'text'} rows={4}/>
        <CheckboxContainer name={'status'} label={'Active'} value={''}/>
        {(props.errorMessage) ? (showAlert(props.errorMessage)) : ('')}
        {(props.successMessage) ? (showAlert(props.successMessage)) : ('')}
        <Grid container justify="flex-end" style={{ marginTop: '10px' }}>
          <Button
            variant="contained" color="primary" style={{ textTransform: 'none', margin: 5 }}
            onClick={() => {
              history.push(`/branches`);
            }}>
            CANCEL
          </Button>
          <Button variant="contained" color="primary" type="submit"
                  style={{ textTransform: 'none', margin: 5 }}>SAVE</Button>
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
    branches: state.branches
  };
}

const reduxFromBranch = reduxForm({
  validate,
  form: 'branch',
  fields: ['name', 'email', 'phone', 'fax', 'address', 'information', 'status']
})(BranchContainer);

export default connect(mapStateToProps, {
  addBranch,
  updateBranch
})(withStyles(Branches)(reduxFromBranch));
