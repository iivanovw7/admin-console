import { Button } from '@material-ui/core';
import React from 'react';
import { debounce } from '../UI/Forms/debounce';

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