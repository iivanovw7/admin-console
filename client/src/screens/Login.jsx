import React from 'react';
import { Paper, withStyles, Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { Helmet } from 'react-helmet';
import { loginUser } from '../actions/auth';
import { connect } from 'react-redux';
import { LoginField } from '../components/Login/LoginField';
import { errorMessage } from '../components/UI/Forms/ErrorMessage';
import { validateLogin } from '../components/UI/Forms/validate';
import { LoginFormStyles } from '../components/UI/ThemeProperties';

const Login = props => {

  const { classes, handleSubmit } = props;

  const submit = formValues => {
    props.signInAction(formValues, props.history);
  };

  return (
    <Paper className={classes.loginFormContainer}>
      <form className={classes.formPaper} onSubmit={handleSubmit(submit)}>
        <Typography variant="h5" component="h3">
          Sign In
        </Typography>
        <hr/>
        <LoginField dataType={'email'}/>
        <LoginField dataType={'password'}/>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Button disableFocusRipple disableRipple style={{ textTransform: 'none' }}
                    variant="text" color="primary">Forgot password ?</Button>
          </Grid>
        </Grid>
        <Grid container justify="flex-start" style={{ marginTop: '10px' }}>
          <Button variant="outlined" color="primary" type="submit"
                  style={{ textTransform: 'none' }}>SIGN IN</Button>
          {errorMessage(props)}
        </Grid>
      </form>
    </Paper>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const reduxFormLogin = reduxForm({
  validate: validateLogin,
  form: 'login',
  fields: ['email', 'password']
})(Login);

export default connect(mapStateToProps, { loginUser })(withStyles(LoginFormStyles)(reduxFormLogin));

