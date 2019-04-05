import { Button } from '@material-ui/core';
import React from 'react';
import { changeGroupStatus } from '../../actions/groups';
import { debounce } from '../UI/Forms/debounce';

export const actionButton = (text, type, row, classes, dispatch, history) => {

  return (
    <Button
      color={type}
      size={'small'}
      className={classes.button}
      onClick={
        debounce(() => {
          dispatch(changeGroupStatus(row._id, history));
        }, 500)
      }
    >
      {text}
    </Button>
  );
};