import { Select } from '@material-ui/core';
import React from 'react';

export const renderSelectField = ({
                                    input,
                                    label,
                                    meta: { touched, error },
                                    children,
                                    ...custom
                                  }) => (

  <Select
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
);

renderSelectField.propTypes = {};

