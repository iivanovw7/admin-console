import { Grid, MenuItem, FormControlLabel, Select, InputLabel, FormControl } from '@material-ui/core';
import React from 'react';
import { Field } from 'redux-form';
import { renderTextField } from './TextField';
import { renderCheckbox } from './Checkbox';
import { renderSelectField } from './SelectField';
import PropTypes from 'prop-types';

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
  value: PropTypes.string
};

export const TextInputContainer = props => {

  const { dataType, rows, type, normalize, disabled } = props;

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
          disabled={disabled}
          variant={'outlined'}
        />
      </Grid>
    </Grid>
  );

};


export const SelectInputContainer = props => {

  const { dataType, label, value, list } = props;

  return (
    <Grid container spacing={16} alignItems="flex-end">
      <Grid item md={true} sm={true} xs={true}>
        <FormControl style={{minWidth: 240}}>
          <InputLabel>{label}</InputLabel>
          <Field
            name={dataType}
            component={renderSelectField}
            onChange={console.log(value)}
            value={value}
          >
            <MenuItem value={null}>
              <em>None</em>
            </MenuItem>
            {list.map(element => (
              <MenuItem value={element._id} key={element._id}>{element.name}</MenuItem>
            ))}
          </Field>
        </FormControl>
      </Grid>
    </Grid>
  );

};



/*

 {list.map(element => {
              return (
                <MenuItem value={10}>{element}</MenuItem>
              );
            })}

<div>
        <Field
          name="favoriteColor"
          component={renderSelectField}
          label="Favorite Color"
        >
          <MenuItem value="ff0000" primaryText="Red" />
          <MenuItem value="00ff00" primaryText="Green" />
          <MenuItem value="0000ff" primaryText="Blue" />
        </Field>
      </div>

 */

TextInputContainer.propTypes = {
  dataType: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string
};