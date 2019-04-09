import { Button } from '@material-ui/core';
import React from 'react';
import { changeRoleStatus } from '../../actions/roles';
import { debounce } from '../UI/Forms/debounce';

export const actionButton = (text, type, row, classes, dispatch) => {

  let blockedRoles = ['USER', 'ADMIN'];

  return (
    <Button
      color={type}
      size={'small'}
      className={classes.button}
      disabled={(blockedRoles.includes(row.code))}
      onClick={
        debounce(() => {
          dispatch(changeRoleStatus(row._id, !row.active));
        }, 500)
      }
    >
      {text}
    </Button>
  );
};