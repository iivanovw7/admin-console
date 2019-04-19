import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { branchAccess, groupAccess } from '../../constants/messagesAccess';

export function ifArrayContains(element, list) {
  for (const current of list) {
    if (current === element) {
      return true;
    }
  }
  return false;
}

export const DestinationSwitch = props => {

  const { value, handleSwitchAction, user } = props;

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>Destination</FormLabel>
      <RadioGroup
        aria-label='position'
        name='position'
        value={value}
        onChange={handleSwitchAction}
        row
      >
        <FormControlLabel
          id={'Branch'}
          value={'Branch'}
          control={<Radio color='primary'/>}
          label={'Branch'}
          labelPlacement='end'
          disabled={ifArrayContains(user.role.code, branchAccess)}
        />
        <FormControlLabel
          id={'Group'}
          value={'Group'}
          control={<Radio color='primary'/>}
          label={'Group'}
          labelPlacement='end'
          disabled={ifArrayContains(user.role.code, groupAccess)}
        />
      </RadioGroup>
    </FormControl>
  );
};

DestinationSwitch.propTypes = {
  handleSwitchAction: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired
};