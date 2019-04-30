import { Button, IconButton, ListItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

export const ImageButton = props => {

  const { classes, image, alt, handleClick, title } = props;

  return (
    <ListItem style={{ padding: 0, marginTop: 3, marginBottom: 3 }}>
      <IconButton className={classes.desktop} color="default" aria-label={alt} onClick={handleClick}
                  size={'small'}>
        <img style={{ width: '24px' }} src={image} alt={alt}/>
      </IconButton>
      <Button
        style={{ fontSize: '0.5rem' }}
        className={classes.mobile} size="small"
        onClick={handleClick}
      >
        {title}
      </Button>
    </ListItem>
  );
};

ImageButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  image: PropTypes.any.isRequired
};

