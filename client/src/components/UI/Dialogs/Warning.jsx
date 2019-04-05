import React from 'react';
import Button from '@material-ui/core/Button';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

const Warning = props => {

  const { message, request, opened, mainText, close } = props;

  return (
    <div>
      <Dialog
        open={opened}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{mainText}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            No
          </Button>
          <Button onClick={request} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

};



export default Warning;