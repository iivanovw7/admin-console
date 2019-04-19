import PropTypes from 'prop-types';
import React from 'react';
import { Selector } from '../../../UI/Selector';

export const TimeLimitSelector = props => {

  const { classes, dataType, limit, limits, handleLimit } = props;
  const hideSelector = ['Permissions', 'Groups'].indexOf(dataType) > -1;

  return (
    <Selector
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
  classes: PropTypes.object.isRequired,
  dataType: PropTypes.string.isRequired,
  handleLimit: PropTypes.func.isRequired,
  limits: PropTypes.array.isRequired
};