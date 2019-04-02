import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

const renderCheckbox = ({
                          id,
                          input,
                        }) => {
  return (
    <Checkbox
      id={id}
      checked={input.value}
      onChange={input.onChange}
      color='primary'
    />
  );
};

renderCheckbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.object
};

export default renderCheckbox;
