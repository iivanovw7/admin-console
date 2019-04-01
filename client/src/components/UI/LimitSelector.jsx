import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

