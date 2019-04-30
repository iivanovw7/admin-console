import { FormControl, FormHelperText, InputLabel, Select } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

export const NumbersSelector = props => {
  const { classes, option, handleSelect, options, title, disabled, help, input } = props;

  return (
    <div className={classes.fromLimitSelector}>
      <FormControl className={classes.formControl}>
        <InputLabel>{title}</InputLabel>
        <Select
          native
          value={option}
          onChange={handleSelect}
          disabled={disabled}
          input={input}
        >
          {options.map(newOption => (
            <option key={newOption} value={newOption}>
              {newOption}
            </option>
          ))}
        </Select>
        <FormHelperText>{help}</FormHelperText>
      </FormControl>
    </div>
  );
};

NumbersSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleSelect: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};
