import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

export const Selector = props => {
  const { classes, option, options, handleSelect } = props;

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Chart</InputLabel>
      <Select
        value={option.id}
        onChange={handleSelect}
        disabled={false}
        input={
          <Input name="style" id="charts-style"/>
        }
      >
        {options.map(newOption => (
          <MenuItem key={newOption.id} value={newOption.id}>
            {newOption.type}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Select styles</FormHelperText>
    </FormControl>
  );
};

Selector.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSelect: PropTypes.func.isRequired
};
