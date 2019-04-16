import { FormControl, InputLabel, Select } from '@material-ui/core';
import React from 'react';

export const Selector = props => {

  const { classes, option, handleSelect, options, title, disabled } = props;

  return (
    <div className={classes.fromLimitSelector}>
      <FormControl className={classes.formControl}>
        <InputLabel>{title}</InputLabel>
        <Select
          native
          value={option}
          onChange={handleSelect}
          disabled={disabled}
        >
          {options.map(newOption => (
            <option key={newOption} value={newOption}>
              {newOption}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );

};
