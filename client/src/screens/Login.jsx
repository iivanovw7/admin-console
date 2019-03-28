import React from 'react';
import { Paper, withStyles, Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { Helmet } from 'react-helmet';
import { signInAction } from '../actions/index';
import { connect } from 'react-redux';
import { InputContainer } from '../components/Login/inputContainer';
import { errorMessage } from '../components/Login/inputErrorMessage';
import { validate } from '../components/Login/inputValidation';

const styles = theme => ({

  [theme.breakpoints.down('sm')]: {
    formContainer: {
      boxShadow: 'none',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  },
  wrapper: {
    maxWidth: '500px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%'
  },
  formContainer: {
    padding: theme.spacing.unit,
    maxWidth: '500px'
  },
  formPaper: {
    margin: theme.spacing.unit * 2
  },
  paddingTop: theme.spacing.unit * 2,
  paddingBottom: theme.spacing.unit * 2

});


const Login = (props) => {

  const { classes } = props;

  const { fields: { email, password }, handleSubmit } = props;

  const submit = (formValues) => {
    props.signInAction(formValues, props.history);

    console.log(props)
  };

  return (
    <div className={classes.wrapper}>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>Admin console</title>
        <link rel="canonical" href=""/>
      </Helmet>
      <Paper className={classes.formContainer}>
        <form className={classes.formPaper} onSubmit={submit()}>
          <Typography variant="h5" component="h3">
            Sign In
          </Typography>
          <hr/>
          <InputContainer dataType={'email'}/>
          <InputContainer dataType={'password'}/>
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

export default connect(mapStateToProps, { signInAction })(withStyles(styles)(reduxFormLogin));

