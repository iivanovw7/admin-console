import { Button } from '@material-ui/core';
import React from 'react';
import { debounce } from "debounce";

export const deleteButton = (row, classes, handleDeleteAction) => {

  let blockedRoles = ['Other'];

  return (
    <Button
      color={'secondary'}
      className={classes.button}
      size={'small'}
      variant={'contained'}
      disabled={blockedRoles.includes(row.code)}
      onClick={
        debounce(() => {
          handleDeleteAction(row._id);
        }, 500)
      }
    >
      Delete
    </Button>
  );
};
