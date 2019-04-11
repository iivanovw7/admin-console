import PropTypes from 'prop-types';
import React from 'react';
import { TextField } from '@material-ui/core';

export const renderTextField = ({
                                  id,
                                  type,
                                  input,
                                  label,
                                  name,
                                  rows = 1,
                                  rowsMax = 1,
                                  variant,
                                  disabled,
                                  required,
                                  meta: { touched, error, warning },
                                  ...custom
                                }) => {
  return (
    <TextField
      id={id}
      label={label}
      type={type}
      name={name}
      error={!!error && touched}
      helperText={error && touched ? error : ' '}
      variant={variant}
      multiline={rows > 1}
      rows={rows}
      rowsMax={rowsMax}
      fullWidth
      required={required}
      disabled={disabled}
      {...input}
      {...custom}
    />

  );
};

renderTextField.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.object,
  id: PropTypes.string,
  input: PropTypes.object,
  type: PropTypes.string,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  name: PropTypes.string,
  variant: PropTypes.string
};
