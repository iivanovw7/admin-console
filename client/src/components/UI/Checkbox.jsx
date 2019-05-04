import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import React from 'react';

export const ActionCheckBox = props => {

  const { status, classes, handleClick } = props;

  return (
    <Checkbox
      className={classes.actionCheckBox}
      checked={status}
      size={'small'}
      color={'primary'}
      onChange={handleClick}
      disabled={false}
    />
  );

};

ActionCheckBox.propTypes = {
  classes: PropTypes.object,
  handleClick: PropTypes.func,
  status: PropTypes.bool
};
