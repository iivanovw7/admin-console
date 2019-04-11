import { Grid, MenuItem, FormControlLabel, InputLabel, FormControl } from '@material-ui/core';
import React from 'react';
import { Field } from 'redux-form';
import { renderTextField } from './TextField';
import { renderCheckbox } from './Checkbox';
import PropTypes from 'prop-types';
import { Select } from 'redux-form-material-ui';

export const CheckboxContainer = props => {

  const { label, name, value, disabled } = props;

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
              disabled={disabled}
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
  disabled: PropTypes.bool
};

export const TextInputContainer = props => {

  const { dataType, rows, rowsMax, type, required, normalize, disabled } = props;

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
          rowsMax={rowsMax}
          disabled={disabled}
          required={required}
          variant={'outlined'}
        />
      </Grid>
    </Grid>
  );

};

TextInputContainer.propTypes = {
  dataType: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool
};


export const SelectInputContainer = props => {

  const { dataType, list, label, valueField } = props;

  return (
    <Grid container spacing={16} alignItems="flex-end">
      <Grid item md={true} sm={true} xs={true}>
        <FormControl style={{width: '100%'}}>
          <InputLabel>{label}</InputLabel>
          <Field
            name={dataType}
            component={Select}
          >
            {list.map(element => (
              <MenuItem value={element[valueField]} key={element._id}>{element.name}</MenuItem>
            ))}
          </Field>
        </FormControl>
      </Grid>
    </Grid>
  );

};

SelectInputContainer.propTypes = {
  dataType: PropTypes.string,
  placeholder: PropTypes.string,
  list: PropTypes.array
};

