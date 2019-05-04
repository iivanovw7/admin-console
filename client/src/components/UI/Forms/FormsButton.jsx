import { Button } from '@material-ui/core';
import React from 'react';

export const FormsButton = props => {

  const { title, handleClick, type } = props;

  return (
    <Button
      variant="contained"
      color="primary"
      type={type ? type : 'button'}
      style={{ textTransform: 'none', margin: 5 }}
      onClick={handleClick}
    >
      {title}
    </Button>
  );
};
