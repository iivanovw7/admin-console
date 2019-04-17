import { Button } from '@material-ui/core';
import { debounce } from 'debounce';
import React from 'react';
import { changeGroupStatus } from '../../actions';

export const actionButton = (text, type, row, classes, dispatch) => {

  return (
    <Button
      color={type}
      size={'small'}
      className={classes.button}
      onClick={
        debounce(() => {
          dispatch(changeGroupStatus(row._id, !row.status));
        }, 500)
      }
    >
      {text}
    </Button>
  );
};