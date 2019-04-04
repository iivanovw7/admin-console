import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import React from 'react';

export const PageSelector = props => {

  const { classes, data, handlePage } = props;
  const page = data.list.page || 1;
  const pages = data.list.pages || 10;

  const pagesNavigation = (title, value) => {
    return (
      <IconButton
        className={classes.button}
        aria-label={title}
        color="primary"
        disabled={
          (page === 1 && title === 'Back')
          ||
          (page === pages && title === 'Next')
        }
        onClick={() => {
          handlePage(value);
        }}
      >
        {(title === 'Next') ?
          (<NavigateNext/>) : (<NavigateBefore/>)}
      </IconButton>
    );
  };

  return (
    <div className={classes.formRoot}>
      <div style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
        {pagesNavigation('Back', page - 1)}
      </div>
      <Typography style={{ alignItems: 'center', display: 'flex', margin: '10px' }}>
        <strong>Page {page} of {pages}</strong>
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
        {pagesNavigation('Next', page + 1)}
      </div>
    </div>
  );

};

