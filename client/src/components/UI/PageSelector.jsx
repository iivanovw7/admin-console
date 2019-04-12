import { CircularProgress, IconButton, Typography } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import React from 'react';

export const PageSelector = props => {

  const { classes, data, handlePage } = props;
  const pages = data.list.pages && data.list.pages > 1 ? data.list.pages : 1;
  const page = data.list.page ? (data.list.page > pages ? handlePage(pages) : data.list.page) : 1;
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
        {title === 'Next' ? <NavigateNext/> : <NavigateBefore/>}
      </IconButton>
    );
  };

  const pagesInformation = () => (
    <Typography className={classes.pageSelectorTitle}>
      <strong>{page} of {pages}</strong>
    </Typography>
  );

  const loadingAnimation = () => (
    <div style={{ display: 'flex', margin: '5px', alignItems: 'center' }}>
      <CircularProgress size={24}/>
    </div>
  );

  const searchResults = () => (
    <Typography className={classes.pageSelectorTitle}>
      Results: {total}
    </Typography>
  );

  return (
    <div className={classes.formRoot}>
      {total ? searchResults() : loadingAnimation()}
      <div style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
        {pagesNavigation('Back', page - 1)}
      </div>
      {page ? pagesInformation() : loadingAnimation()}
      <div style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
        {pagesNavigation('Next', page + 1)}
      </div>
    </div>
  );

};

