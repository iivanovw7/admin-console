import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

export const Switcher = props => {

  const { value, handleSwitchAction, options, title } = props;

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>
        {title}
      </FormLabel>
      <RadioGroup
        aria-label='position'
        name='position'
        value={value}
        onChange={handleSwitchAction}
        row
      >
        {options.map(option => (
          <FormControlLabel
            id={option.name}
            value={option.name}
            control={<Radio color='primary'/>}
            label={option.name}
            labelPlacement='end'
            disabled={option.accessRights}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

Switcher.propTypes = {
  handleSwitchAction: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string
};
