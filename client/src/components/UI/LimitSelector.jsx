import { FormControl, InputLabel, Select } from '@material-ui/core';
import React from 'react';

export const LimitSelector = props => {

  const { classes, limit, handleLimit, limits } = props;

  return (
    <div className={classes.fromLimitSelector}>
      <FormControl className={classes.formControl}>
        <InputLabel>Results limit</InputLabel>
        <Select
          native
          value={limit}
          onChange={handleLimit}
        >
          {limits.map(newLimit => (
            <option key={newLimit} value={newLimit}>
              {newLimit}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );

};
