import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Notification } from '../ThemeProperties';


const AlertSnackbar = props => {

  const { classes, message, afterConfirm, success } = props;
  const [opened, handleSnackbar] = useState(false);

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
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={opened}
        autoHideDuration={5000}
        onClose={() => {
          afterConfirm();
        }}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={
          <span id="message-id"
                style={(success) ? ({ color: 'green' }) : ({ color: 'red' })}>
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
            <CloseIcon/>
          </IconButton>
        ]}
      />
    </div>
  );
};

AlertSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(Notification)(AlertSnackbar);