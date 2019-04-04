import { Grid } from '@material-ui/core';
import React from 'react';
import { Field } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { renderTextField } from './TextField';
import { renderCheckbox } from './Checkbox';
import PropTypes from 'prop-types';

export const CheckboxContainer = (props) => {

  const { label, name, value } = props;

  return (
    <Grid container spacing={16} alignItems="flex-end">
      <Grid item md={true} sm={true} xs={true}>
        <FormControlLabel
          control={
            <Field
              name={name}
              type={'checkbox'}
              value={value}
              component={renderCheckbox}
              id={name}
            />
          }
          label={label}
        />
      </Grid>
    </Grid>
  );

};

CheckboxContainer.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string
};

export const TextInputContainer = (props) => {

  const { dataType, rows, type, normalize } = props;

  return (
    <Grid container spacing={16} alignItems="flex-end">
      <Grid item md={true} sm={true} xs={true}>
        <Field
          name={dataType}
          type={type}
          component={renderTextField}
          label={dataType}
          id={dataType}
          normalize={normalize}
          rows={rows}
          rowsMax={rows}
          variant={'outlined'}
        />
      </Grid>
    </Grid>
  );

};

TextInputContainer.propTypes = {
  dataType: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string
};
