import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export const PageSelector = props => {

  const { classes, data, handlePage } = props;
  const page = data.list.page || 1;
  const pages = data.list.pages || 10;

  const selectorButton =(title, value) => {
    return (
      <Button size="small"
              disabled={
                (page === 1 && title === 'PREV') ||
                (page === pages && title === 'NEXT')
              }
              className={classes.margin}
              onClick={() => {
                handlePage(value);
              }}>
        {title}
      </Button>
    );
  };

  return (
    <div className={classes.formRoot}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {selectorButton('PREV', page - 1)}
      </div>
      <Typography style={{ alignItems: 'center', display: 'flex', margin: '10px' }}>
        <strong>Page {page} of {pages}</strong>
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {selectorButton('NEXT', page + 1)}
      </div>
    </div>
  );

};

