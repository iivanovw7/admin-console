import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Snackbar, IconButton } from '@material-ui/core';
import { Notification } from '../ThemeProperties';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const AlertSnackbar = props => {

  const { classes, message, afterConfirm, success } = props;
  const [opened, handleSnackbar] = useState(false);

  const variantIcon = {
    success: CheckCircleIcon,
    error: ErrorIcon,
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
      autoHideDuration={4000}
      onClose={() => {
        afterConfirm();
      }}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
    >
      <SnackbarContent
        className={(success) ? (classes.success) : (classes.error)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
          <Icon className={(success) ? (classes.success) : (classes.error)} />
            {message}
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
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

AlertSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(Notification)(AlertSnackbar);


