import { Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { addNewBranch, updateBranch } from '../../actions';
import { validateBranch } from '../../utils/formsValidator';
import normalizePhone from '../../utils/phoneNormalizer';
import { FormsButton } from '../UI/Forms/FormsButton';
import { CheckboxContainer, TextInputContainer } from '../UI/Forms/InputContainers';
import AlertSnackbar from '../UI/Notifications/Snackbar.jsx';
import { Container } from '../UI/ThemeProperties';

const BranchContainer = props => {

  const { classes, history, handleSubmit, dispatch, branch } = props;
  const textInputs = ['name', 'email', 'phone', 'fax', 'address', 'information'];

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
        {textInputs.map(input => (
          <TextInputContainer
            key={input}
            dataType={input}
            type={input !=='text' ? input : 'text'}
            normalize={(input === 'phone' || input === 'phone') ? normalizePhone : null}
            required={false}
            rows={(input === 'address' || input === 'information') ? 4 : 1}
          />
        ))}
        <CheckboxContainer name={'status'} label={'Active'} value={''}/>
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
              history.push(`/branches`);
            }}
          />
          <FormsButton title={'SAVE'} type={'submit'}/>
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
    messageConfirmed: state.branches.confirmed
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
