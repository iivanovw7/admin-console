import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {Notification} from '../ThemeProperties';


const AlertSnackbar = (props) =>  {

  const { classes } = props;
  const [opened, handleSnackbar] = useState(false);

  const handleClick = () => {
    handleSnackbar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    handleSnackbar(false);
  };

  return (
    <div>
      <Button onClick={handleClick}>Open simple snackbar</Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={opened}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Note archived</span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
            UNDO
          </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
};

AlertSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(Notification)(AlertSnackbar);