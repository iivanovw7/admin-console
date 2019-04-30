import { Button } from '@material-ui/core';
import { debounce } from 'debounce';
import React from 'react';
import PropTypes from 'prop-types';

export const TextButton = props => {

  const { color, classes, handleClick, disabled, variant, text } = props;

  return (
    <Button
      color={color}
      className={classes.button}
      size={'small'}
      variant={variant}
      disabled={disabled}
      onClick={
        debounce(() => {
          handleClick();
        }, 500)
      }
    >
      {text}
    </Button>
  );
};

TextButton.propTypes = {
  classes: PropTypes.object,
  handleClick: PropTypes.func,
  status: PropTypes.bool,
  disabled: PropTypes.bool
};
