import React from 'react';
import { Paper, withStyles, Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { Helmet } from 'react-helmet';
import { signInAction } from '../actions/index';
import { connect } from 'react-redux';
import { InputContainer } from '../components/Login/InputContainer';
import { errorMessage } from '../components/Login/InputErrorMessage';
import { validate } from '../components/Login/InputValidation';
import { LoginFormStyles } from '../components/UI/ThemeProperties';

const Login = (props) => {

  const { classes } = props;

  const { fields: { email, password }, handleSubmit } = props;

  const submit = (formValues) => {
    props.signInAction(formValues, props.history);

  };

  return (
    <div className={classes.wrapper}>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>Admin console - Login</title>
        <link rel="canonical" href=""/>
      </Helmet>
      <Paper className={classes.formContainer}>
        <form className={classes.formPaper} onSubmit={handleSubmit(submit)}>
          <Typography variant="h5" component="h3">
            Sign In
          </Typography>
          <hr/>
          <InputContainer dataType={'email'} data={email}/>
          <InputContainer dataType={'password'} data={password}/>
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
    </div>
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
  validate,
  form: 'login',
  fields: ['email', 'password']
})(Login);

export default connect(mapStateToProps, {
  signInAction
})(withStyles(LoginFormStyles)(reduxFormLogin));

