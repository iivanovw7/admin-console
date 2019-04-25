import PropTypes from 'prop-types';
import { Icon, IconButton } from '@material-ui/core';
import React from 'react';

export const LogoutButton = props => {
  const { handleLogout, history, dispatch } = props;

  return (
    <IconButton
      style={{ textTransform: 'none', color: 'white' }}
      aria-label="Delete"
      onClick={() => {
        dispatch(handleLogout(history));
      }}
    >
      <Icon>exit_to_app</Icon>
    </IconButton>
  );
};

LogoutButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
