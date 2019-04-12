import { Button } from '@material-ui/core';
import { debounce } from 'debounce';
import React from 'react';

export const deleteButton = (row, classes, handleDeleteAction) => {

  let blockedRoles = [
    'ADMIN',
    'USER',
    'SUPPORT',
    'MANAGER',
    'BRANCH_ADMIN',
    'BRANCH_SUPPORT'
  ];

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