import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';
import { changeUserStatus } from '../../actions/users';

export const actionCheckBox = (row, classes, dispatch, history) => {

  return (
    <Checkbox
      style={{ height: '16px' }}
      checked={row.status}
      size={'small'}
      color={'primary'}
      onChange={
        () => {
          dispatch(changeUserStatus(row._id, !row.status, history));
        }
      }
      disabled={false}
    />
  );

};

