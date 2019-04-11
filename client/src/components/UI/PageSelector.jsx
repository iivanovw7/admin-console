import { Typography, IconButton } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import React from 'react';

export const PageSelector = props => {

  const { classes, data, handlePage } = props;
  const page = data.list.page || 1;
  const pages = data.list.pages || 1;
  const total = data.list.results || 0;

  const pagesNavigation = (title, value) => {
    return (
      <IconButton
        className={classes.button}
        aria-label={title}
        color="primary"
        disabled={
          (page === 1 && title === 'Back') ||
          (page === pages && title === 'Next')
        }
        onClick={() => {
          handlePage(value);
        }}
      >
        {
          title === 'Next' ?
          <NavigateNext/> : <NavigateBefore/>
        }
      </IconButton>
    );
  };

  return (
    <div className={classes.formRoot}>
      <Typography className={classes.pageSelectorTitle}>
        Results: {total}
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
        {pagesNavigation('Back', page - 1)}
      </div>
      <Typography className={classes.pageSelectorTitle}>
        <strong>{page} of {pages}</strong>
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
        {pagesNavigation('Next', page + 1)}
      </div>
    </div>
  );

};

