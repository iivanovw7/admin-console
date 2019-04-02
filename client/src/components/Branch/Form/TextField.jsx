import React from 'react';
import { TextField } from '@material-ui/core';

export const renderTextField = ({
                                  id,
                                  type,
                                  input,
                                  label,
                                  name,
                                  rows = 1,
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
      variant="outlined"
      multiline
      rows={rows}
      rowsMax={rows}
      fullWidth
      required
      {...input}
      {...custom}
    />

  );
};
