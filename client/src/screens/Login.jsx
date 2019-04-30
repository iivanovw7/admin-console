import { Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { loginUser } from '../actions';
import { errorMessage } from '../components/UI/Forms/ErrorMessage';
import { FormsButton } from '../components/UI/Forms/FormsButton';
import { TextInputContainer } from '../components/UI/Forms/InputContainers';
import { LoginFormStyles } from '../components/UI/ThemeProperties';
import { validateLogin } from '../utils/formsValidator';

const Login = props => {

  const { classes, handleSubmit } = props;
  const submit = formValues => {
    props.loginUser(formValues, props.history);
  };

  useEffect(() => {
    if (props.authenticated) {
      props.history.push('/statistics');
    }
  }, []);

  return (
    <div className={classes.loginWrapper}>
      <Paper className={classes.loginFormContainer}>
        <form className={classes.formPaper} onSubmit={handleSubmit(submit)}>
          <Typography variant="h5" component="h3">
            Sign In
          </Typography>
          <hr/>
          <TextInputContainer dataType={'email'} type={'email'} variant={'standard'}/>
          <TextInputContainer dataType={'password'} type={'password'} variant={'standard'}/>
          <Grid container justify="flex-start" style={{ marginTop: '10px' }}>
            <FormsButton title={'SIGN IN'} type={'submit'}/>
            {errorMessage(props)}
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.user.authenticated,
    errorMessage: state.auth.error
  };
}

const reduxFormLogin = reduxForm({
  validate: validateLogin,
  form: 'login',
  fields: ['email', 'password']
})(Login);

export default connect(mapStateToProps, { loginUser })(withStyles(LoginFormStyles, { withTheme: true })(reduxFormLogin));
