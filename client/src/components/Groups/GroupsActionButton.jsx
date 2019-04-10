import { Button } from '@material-ui/core';
import React from 'react';
import { changeGroupStatus } from '../../actions';
import { debounce } from "debounce";

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