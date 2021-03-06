import { IconButton, Snackbar, SnackbarContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import * as types from '../../../constants/actionTypes';
import { Notification } from '../ThemeProperties';


const AlertSnackbar = props => {

  const { classes, message, afterConfirm, success, dispatch } = props;
  const [opened, handleSnackbar] = useState(false);

  const variantIcon = {
    success: CheckCircleIcon,
    error: ErrorIcon
  };

  const Icon = ((success) ? (variantIcon.success) : (variantIcon.error));

  const handleClick = () => {
    handleSnackbar(true);
  };

  const handleClose = (event, reason) => {

    if (reason === 'clickaway') {
      return;
    }

    if (afterConfirm) {
      afterConfirm();
    }

    handleSnackbar(false);
  };

  useEffect(() => {
    if (message) {
      handleClick();
    }
  }, []);


  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={opened}
      autoHideDuration={3000}
      onClose={() => {
        dispatch({
          type: types.CONFIRM_NOTIFICATION
        });
        afterConfirm();
      }}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
    >
      <SnackbarContent
        className={
          success ?
            classes.success : classes.error
        }
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
          <Icon className={
            success ?
              classes.success : classes.error
          }
          />
            &nbsp; &nbsp; {message}
        </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon className={classes.icon}/>
          </IconButton>
        ]}
      />
    </Snackbar>
  );
};

AlertSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(Notification)(AlertSnackbar);


