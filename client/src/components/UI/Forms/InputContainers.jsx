import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'redux-form';
import { Select, TextField, Checkbox } from 'redux-form-material-ui';

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
              component={Checkbox}
              id={name}
              disabled={disabled}
              color={'primary'}
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

  const { dataType, className, rows = 1, rowsMax = 1, type = 'text', required, normalize, disabled, variant } = props;

  return (
    <Grid container spacing={16} alignItems="flex-end" className={className}>
      <Grid item md={true} sm={true} xs={true}>
        <Field
          name={dataType}
          type={type}
          component={TextField}
          label={dataType}
          id={dataType}
          normalize={normalize}
          rows={rows}
          rowsMax={rowsMax}
          disabled={disabled}
          required={required}
          variant={variant ? variant : 'outlined'}
          multiline={rows > 1}
          fullWidth
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

  const { dataType, list, label, valueField, disabled } = props;

  return (
    <Grid container spacing={16} alignItems="flex-end">
      <Grid item md={true} sm={true} xs={true}>
        <FormControl style={{ width: '100%' }}>
          <InputLabel>{label}</InputLabel>
          <Field
            name={dataType}
            disabled={disabled}
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

