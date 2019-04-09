import { Select } from '@material-ui/core';
import React from 'react';

export const renderSelectField = ({
                                    input,
                                    label,
                                    value,
                                    meta: { touched, error },
                                    children,
                                    ...custom
                                  }) => (

  <Select
    value={value}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
);

renderSelectField.propTypes = {};

