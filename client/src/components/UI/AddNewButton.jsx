import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import withWidth from '@material-ui/core/withWidth';

const AddNewButton = props => {

  const { classes, width } = props;

  const mobileButton = () => {
    return (
      <Button size="small" className={classes.margin}>
        NEW
      </Button>
    );
  };

  const desktopButton = () => {
    return (
      <Fab color="primary" size="small" aria-label="Add" className={classes.fab}>
        <AddIcon />
      </Fab>
    );
  };

  const components = {
    xs: mobileButton(),
    sm: mobileButton(),
  };

  const Component = components[width] || desktopButton();


  return (
    <div className={classes.formRoot}>
      {Component}
    </div>
  );

};

AddNewButton.propTypes = {
  width: PropTypes.string.isRequired,
};

export default withWidth()(AddNewButton);

