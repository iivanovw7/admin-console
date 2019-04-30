import PropTypes from 'prop-types';
import React from 'react';
import { NumbersSelector } from '../../../UI/NumbersSelector';

export const TimeLimitSelector = props => {
  const { classes, dataType, limit, limits, handleLimit } = props;
  const hideSelector = ['Permissions', 'Groups'].indexOf(dataType) > -1;

  return (
    <NumbersSelector
      classes={classes}
      title={'Months'}
      option={hideSelector ? 'Total' : limit}
      options={hideSelector ? ['Total'] : limits}
      disabled={hideSelector}
      handleSelect={handleLimit}
    />
  );
};

TimeLimitSelector.propTypes = {
  handleLimit: PropTypes.func.isRequired,
  limits: PropTypes.array.isRequired
};
