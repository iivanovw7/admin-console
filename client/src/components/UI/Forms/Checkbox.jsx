import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';


export const renderCheckbox = ({ id, input, meta: { touched, error, warning } }) => {

  return (
    <Checkbox
      id={id}
      checked={input.value}
      onChange={input.onChange}
      disabled={false}
      color={(!!error) ? ('secondary') : ('primary')}
    />
  );
};

renderCheckbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.object,
  id: PropTypes.string,
  input: PropTypes.object
};

