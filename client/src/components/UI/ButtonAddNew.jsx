import { Button, Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';
import { Buttons } from './ThemeProperties';

const ButtonAddNew = props => {

  const { classes, history, element } = props;

  function handleClick() {
    return history.push(history.push(`/${element}/new`));
  }

  return (
    <div className={classes.formRoot}>
      <Button
        size="small"
        className={classes.mobile}
        onClick={() => {
          handleClick();
        }}
      >
        <strong>Create</strong>
      </Button>
      <Fab
        color="primary"
        size="small"
        aria-label="Add"
        className={classes.desktop}
        onClick={() => {
          handleClick();
        }}>
        <AddIcon/>
      </Fab>
    </div>
  );

};

ButtonAddNew.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(Buttons, { withTheme: true })(ButtonAddNew);