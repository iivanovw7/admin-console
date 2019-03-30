import React from 'react';
import { TextField } from '@material-ui/core';

export const renderTextField = ({
                                  id,
                                  type,
                                  input,
                                  label,
                                  name,
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
      {...input}
      {...custom}
      fullWidth
      required
    />
  );
};